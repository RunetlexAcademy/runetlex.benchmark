# Builds one HTML file per site section so search engines can index them:
#   index.html, method/, catalog/, cases/, experts/, about/, service/S001/ …, task/T001/ …, 404.html, sitemap.xml
# Every file is the same app shell (index.html) with its own <title>, description, canonical address and a short
# text version of the page inside #app (the app replaces it when it starts).
#
# Run from the site folder after data.json / results.json change:
#   ruby -Ku tools/build_pages.rb [path/to/results.json]
require 'json'
require 'cgi'
require 'fileutils'

SITE = 'https://benchmark.runetlex-academy.ru'
BRAND = 'Рунетлекс Бенчмарк'
results_path = ARGV[0] || 'results.json'
d = JSON.parse(File.read('data.json'))
r = JSON.parse(File.read(results_path))
tpl = File.read('index.html')
abort 'index.html has no <!--seo--> block' unless tpl.include?('<!--seo-->') && tpl.include?('<!--/seo-->')

h = ->(s) { CGI.escapeHTML(s.to_s) }
areas = (d['areas'] || []).map { |a| a.to_s.split(',').first.strip }
tasks = r['tasks'] || []
res = r['results'] || {}
total_crit = tasks.sum { |t| t['total'].to_i }
services = (d['services'] || []).map do |s|
  rows = res[s['id']] || []
  solved = rows.count { |x| x['s'] }
  pts = rows.sum { |x| x['p'].to_i }
  s.merge('solved' => solved, 'pct' => total_crit.positive? ? (pts * 100.0 / total_crit).round : 0, 'tested' => s['tested'] && rows.any?)
end
tested = services.select { |s| s['tested'] }
experts = (d['experts'] || []).reject { |e| e['hidden'] }
n_tasks = tasks.size

page = lambda do |path, title, desc, body|
  full = title.to_s.empty? ? BRAND : "#{title} — #{BRAND}"
  url = SITE + path
  html = tpl.dup
  html.sub!(%r{<title>.*?</title>}m) { "<title>#{h[full]}</title>" }
  html.sub!(/<meta name="description" content="[^"]*">/) { %(<meta name="description" content="#{h[desc]}">) }
  html.sub!(/<link rel="canonical" href="[^"]*">/) { %(<link rel="canonical" href="#{url}">) }
  html.sub!(/<meta property="og:title" content="[^"]*">/) { %(<meta property="og:title" content="#{h[full]}">) }
  html.sub!(/<meta property="og:description" content="[^"]*">/) { %(<meta property="og:description" content="#{h[desc]}">) }
  html.sub!(/<meta property="og:url" content="[^"]*">/) { %(<meta property="og:url" content="#{url}">) }
  html.sub!(%r{<!--seo-->.*?<!--/seo-->}m) { "<!--seo--><div class=\"seo\">#{body}</div><!--/seo-->" }
  file = path == '/' ? 'index.html' : File.join(path.sub(%r{^/}, ''), 'index.html')
  FileUtils.mkdir_p(File.dirname(file))
  File.write(file, html)
  url
end

nav_links = [['/', 'Результаты'], ['/method/', 'Методология'], ['/catalog/', 'Все ИИ-сервисы'], ['/cases/', 'Кейсы'], ['/experts/', 'Эксперты'], ['/about/', 'О нас']]
nav = '<nav>' + nav_links.map { |p, n| %(<a href="#{p}">#{h[n]}</a>) }.join(' · ') + '</nav>'
svc_link = ->(s) { %(<a href="/service/#{s['id']}/">#{h[s['name']]}</a>) }
urls = []

home_desc = "Оценка юридических ИИ-сервисов: #{tested.size} сервис, #{n_tasks} задачи по пяти отраслям права, #{experts.size} экспертов. Результаты, номинации и методология."
ranked = tested.sort_by { |s| [-s['solved'], -s['pct']] }
urls << page.call('/', '', home_desc, "#{nav}<h1>#{BRAND}</h1><p>Оценка юридических ИИ-сервисов. #{h[home_desc]}</p><h2>Результаты</h2><ol>" +
  ranked.map { |s| "<li>#{svc_link[s]}: решено #{s['solved']} из #{n_tasks}, полнота ответов #{s['pct']}%</li>" }.join + '</ol>')

urls << page.call('/method/', 'Методология', 'Как мы проверяли юридические ИИ-сервисы: задачи, критерии, слепая оценка и перепроверка.',
  "#{nav}<h1>Методология</h1><p>Как мы проверяли юридические ИИ-сервисы: задачи, критерии, слепая оценка и перепроверка.</p><h2>Задачи</h2><ul>" +
  tasks.map { |t| %(<li><a href="/task/#{t['id']}/">#{h[t['title']]}</a></li>) }.join + '</ul>')
urls << page.call('/catalog/', 'Все ИИ-сервисы', 'Каталог юридических ИИ-сервисов с результатами проверки и навыками.',
  "#{nav}<h1>Все ИИ-сервисы</h1><ul>" + services.map { |s| "<li>#{svc_link[s]}#{s['line'] ? ' — ' + h[s['line']] : ''}</li>" }.join + '</ul>')
urls << page.call('/cases/', 'Кейсы', 'Как юристы применяют ИИ-сервисы в работе.',
  "#{nav}<h1>Кейсы</h1><ul>" + (d['cases'] || []).map { |c| "<li>#{h[c['title']]} (#{h[c['client']]})</li>" }.join + '</ul>')
urls << page.call('/experts/', 'Эксперты', 'Эксперты, которые составили задачи бенчмарка, и организации-оценщики.',
  "#{nav}<h1>Эксперты</h1><ul>" + experts.map { |e| "<li>#{h[e['name']]}</li>" }.join + '</ul>')
urls << page.call('/about/', 'О нас', 'Команда Рунетлекс Бенчмарка и Рунетлекс Академии.', "#{nav}<h1>О нас</h1>")

services.each do |s|
  desc = s['tested'] ? "#{s['name']}: решено #{s['solved']} из #{n_tasks} задач, полнота ответов #{s['pct']}%. Результаты по отраслям права и ответы на каждую задачу." : "#{s['name']} в каталоге юридических ИИ-сервисов Рунетлекс Бенчмарка."
  body = "#{nav}<h1>#{h[s['name']]}</h1>" + (s['line'] ? "<p>#{h[s['line']]}</p>" : '') + "<p>#{h[desc]}</p>" + (s['short'] ? "<p>#{h[s['short']]}</p>" : '')
  urls << page.call("/service/#{s['id']}/", s['name'], desc, body)
end
tasks.each do |t|
  area = t['areaName'] || areas[t['area'].to_i] || ''
  desc = "Задача бенчмарка «#{t['title']}»#{area.empty? ? '' : " (#{area})"}: ответы #{tested.size} юридических ИИ-сервисов и оценки по критериям."
  urls << page.call("/task/#{t['id']}/", t['title'], desc, "#{nav}<h1>#{h[t['title']]}</h1><p>#{h[desc]}</p>")
end

# Any other address opens the app too (GitHub Pages serves 404.html for unknown paths).
FileUtils.cp('index.html', '404.html')
today = Time.now.strftime('%Y-%m-%d')
File.write('sitemap.xml', %(<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n) +
  urls.map { |u| "  <url><loc>#{u}</loc><lastmod>#{today}</lastmod></url>\n" }.join + "</urlset>\n")
puts "pages: #{urls.size}"

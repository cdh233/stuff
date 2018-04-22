#!/bin/env python
# -*- coding: utf-8 -*-

import os,sys
import pdfkit

# https://github.com/JazzCore/python-pdfkit
# https://github.com/Kozea/WeasyPrint
# https://wkhtmltopdf.org/

print "os.path.realpath(__file__)=%s" % os.path.realpath(__file__)
print "sys.path[0]=%s" % sys.path[0]

# A4纸张尺寸：210mm * 297mm
# 1英寸：2.54cm
# 假设屏幕DPI(Dots per inch)为72像素（pixels）每英寸，计算一下，结果为72px/2.54 = 28.34px
# 下面给出常见分辨率下，A4纸张大小在屏幕上的像素尺寸：
# DPI：72px/inch，A4 size（598 * 842）；
# DPI：96px/inch，A4 size（794* 1123）；（default）
# DPI：120px/inch，A4 size（1487* 2105）；
# DPI：150px/inch，A4 size（1240* 1754）；
# DPI：300px/inch，A4 size（2480* 3508）；

# Multiple CSS files
css = [
		'http://www.neitui.me/css/bootstrap/bootstrap.min.css',
		'http://www.neitui.me/css/bootstrap/global_import.css',
		'http://www.neitui.me/js/lib/jquery-ui.min.css',
		'http://www.neitui.me/lcp/view_bootstrap/index/style.css',
		'http://www.neitui.me/modulenew/resume/bt_index/resume.css',
		'http://www.neitui.me/js/lib/jquery.simplecanleder.css',
		'http://www.neitui.me/modulenew/resume/bt_index/resumepdf.css'
	]

options = {
    'page-size': 'A4', #Set paper size to: A4, Letter, etc. (default A4)
    # 'page-width': '800px',
    # 'quiet': '',
    'no-outline': '',
    'background': '',
    #'no-background': '',
    #'letter-spacing': 0,
    #'no-pdf-compression': '',
    'debug-javascript': '',
    #'viewport-size': '800px',
    # 'viewport-size': 'width=800px',
    #'dpi': 96,
    #'dpi': 120,
    # 'dpi': 150,
    # 'dpi': 300,
    'dpi': 480,  
    #'dpi': 72,
    # 'zoom': 7.82,
    # 'zoom': 6.4,
    #'zoom': 2,
#    'zoom': 1,  ##### 低分屏 ######
    'zoom': 0.5, ##### 高分屏 ######
    'margin-top': '20mm',
    'margin-bottom': '16mm',
    # 'margin-top': '0mm',
    # 'margin-bottom': '0mm',
    'margin-left': '16mm',
    'margin-right': '16mm',
    'encoding': "UTF-8",
    'images': '',
    'enable-local-file-access': '',
    'minimum-font-size': 8,
    'resolve-relative-links': '',
    #'radiobutton-svg': '',
    #'checkbox-svg': '',
    #'enable-smart-shrinking': '',
    'disable-smart-shrinking': '',
    # 'run-script': 'console.log("0xcb ==== html load finish!");',
    # 'run-script': 'console.log("0xcb ==== html load finish!" + " | " + document.body.clientWidth + " | " + document.body.clientHeight + " | " + document.body.offsetWidth + " | " + document.body.offsetHeight + " | " + document.body.scrollWidth + " | " + document.body.scrollHeight + " | " + window.screen.width + " | " + window.screen.height + " | " + window.screen.availWidth + " | " + window.screen.availHeight);',
    #var cb_skills_div = document.querySelectorAll("body > div > div:nth-child(5) > div.part-con > div > div > span");
    #for(var i=0; i<cb_skills_div.length; ++i) { console.log(cb_skills_div[i].innerText); }
    #for(var i=0; i<cb_skills_div.length; ++i) { cb_skills_div[i].style = "font-size = 14px;"; }
    'run-script': 'document.getElementById("cb_watermark").style.display = "block"; \
    document.querySelector("body > div.dl-resume").style = "width: 100%;"; \
    console.log("0xcb end exec js!" + document.getElementById("cb_watermark").style.display);',
    'custom-header' : [
        ('Accept-Encoding', 'gzip')
    ],
    'cookie': [
        ('cookie-name1', 'cookie-value1'),
        ('cookie-name2', 'cookie-value2'),
    ],
    # 'no-outline': None
}

# pdfkit.from_string('Hello!', 'out.pdf')
# pdfkit.from_url('http://127.0.0.1:8020/www.neitui.me/resume.html', 'resume_p2.pdf', options=options)
# pdfkit.from_file('resume.html', 'resume_pdfkit.pdf', options=options, css=css)
pdfkit.from_file('resume.html', '../resume.pdf', options=options)




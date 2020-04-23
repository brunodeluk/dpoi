from bs4 import BeautifulSoup

def parse_html(html, encoding="UTF-8"):
    """ parses an html using lxml.html parser"""
    return BeautifulSoup(html, 'lxml')


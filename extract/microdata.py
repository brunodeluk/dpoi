from utils.utils import parse_html
import lxml.html as lhtml
from bs4 import Tag 
import json
from uuid import uuid4 
import copy

class MicrodataExtractor:

    def __init__(self, url):
        self.url = url

    def extract(self, html_string):
        html = parse_html(html_string)
        root = html.find_all(itemscope=True, itemprop=False)
        if not root:
            return []

        items = []
        for node in root:
            items.append(self.tojsonld(node))

        return items
    
    def tojsonld(self, root, url='', memory = []):
        memory.append(root)
        item = {}
        self._add_thing_properties(item, root)
        self._extract_props(item, root, memory)
        return item
        
    def _extract_props(self, properties, node, memory):
        nodelist = []
        for child in node.children:
            nodelist.extend(self._extract_propertynodes(child, memory))

        for node in nodelist:
            props = node['itemprop'].split()
            for prop in props:
                value = self._extract_property_value(node)
                if prop in properties:
                    if type(properties[prop]) is list:
                        properties[prop].append(value)
                    else:
                        properties[prop] = [properties[prop], value]
                else:
                    properties[prop] = value
        

    def _extract_propertynodes(self, node, memory):
        propertynodes = []

        if not isinstance(node, Tag):
            return propertynodes
        
        if node.get('itemprop'):
            propertynodes.append(node)
        
        if node.get('itemscope') is not None:
            return propertynodes

        for child in node.children:
            if child in memory:
                continue
            memory.append(child)
            propertynodes.extend(self._extract_propertynodes(child, memory))

        return propertynodes

    def _extract_property_value(self, node):
        value_attr = \
            {
                'meta': 'content',
                'audio': 'src',
                'embed': 'src',
                'iframe': 'src',
                'img': 'src',
                'source': 'src',
                'track': 'src',
                'video': 'src',
                'a': 'href',
                'area': 'href',
                'link': 'href',
                'object': 'data',
                'data': 'value',
                'time': 'datetime',
            }
        value = None
        if node.get('itemscope') is not None:
            value = self.tojsonld(node)
        elif node.get('content') is not None:
            value = node['content']
        elif node.name in value_attr:
            value = node[value_attr[node.name]]
        else:
            value = node.get_text()

        return value

    def _add_thing_properties(self, jsonld, root):
        _id = str(uuid4())
        _type = root.get('itemtype').replace('https://schema.org/', '')

        if _type == None:
            _type = "Thing"
        
        jsonld["@context"] = "http://schema.org"
        jsonld['@id'] = _id
        jsonld['@type'] = _type
        jsonld['url'] = self.url
        
        

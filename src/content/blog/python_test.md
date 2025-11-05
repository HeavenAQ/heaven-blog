---
title: 'Python Test'
description: 'This is a python test'
pubDate: 'Jul 01 2022'
heroImage: '/placeholder-hero.jpg'
updatedDate: 'Jul 03 2022'
categories: ['Programming', 'Python']
tags: ['decorators', 'parsing', 'xml', 'json']
---

```py
@Debug.false_on_err
def parse_res(
    self, parse_data: str, res_type: str, *, res: Response, root: ET.Element
):
    return (
        parser.parse_json_res(
            parse_data,
            RequestType.SETUP,
            res,
        )
        if res_type == "json" and isinstance(res, Response)
        else parser.parse_xml_res(
            parse_data,
            RequestType.SETUP,
            root,
        )
    )
```

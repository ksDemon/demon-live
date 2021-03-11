import pandas as pd
import requests
import io
import os

url="https://docs.google.com/spreadsheets/d/e/2PACX-1vQGixGG8So7J6kz5SaiDTQPjIBXxyIwL9VLAEFjQVP57SMt9jhZ-zgpWNwV_KKTZ6vO6CMmNbp1CPh3/pub?gid=1072444358&single=true&output=csv"
content_request = requests.get(url).content

df = pd.read_csv(io.StringIO(content_request.decode('utf-8'))).astype(str).fillna("")

for ix in df.index:
    row = df.loc[ix].tolist()[1:7]
    if len(row[0]) == 1:
        row[0] = "0" + row[0]
    if len(row[2]) == 1:
        row[2] = "0" + row[2]
    pagina = "/Users/ksDemon/Documents/DemonLive/src"+"/msc/{}/{}/{}.njk".format(*row[:3])
    if not os.path.exists(os.path.dirname(pagina)):
        try:
            os.makedirs(os.path.dirname(pagina))
        except OSError as exc: # Guard against race condition
            if exc.errno != errno.EEXIST:
                raise
    f = open(pagina, "w+", encoding="utf-8")
    f.write("---\n")
    f.write("title: "+ "{}{}{}".format(*row[:3])+"\n")
    f.write("layout: base.njk"+"\n")
    f.write("---\n")
    f.write('<div class="container">\n')
    f.write("<h1>"+row[5]+"</h1>\n")
    f.write("</div>")

    f.close()
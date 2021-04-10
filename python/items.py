import pandas as pd
import requests
import io
import os

url="https://docs.google.com/spreadsheets/d/e/2PACX-1vTTZlQ6vEiVhjqw8Ope0BbCPO9E-ySoKlzS0KXmxN8lAP-WymnO9xVyr6fVq4NsrL-p1og8EQMN_pOP/pub?gid=0&single=true&output=csv"
content_request = requests.get(url).content

df = pd.read_csv(io.StringIO(content_request.decode('utf-8'))).astype(str).fillna("")

for ix in df.index:
    row = df.loc[ix].tolist()
    f = True
    name = row[1].split(" ")
    named = ""
    for e in name:
        if f:
            named += e
            f = False
        else:
            named += "-" + e

    direc = "/Users/ksDemon/Documents/DemonLive/src"+"/items/{}/{}.njk".format(named,named)
    if not os.path.exists(os.path.dirname(direc)):
        try:
            os.makedirs(os.path.dirname(direc))
        except OSError as exc:
            if exc.errno != errno.EEXIST:
                raise

    #Escribe "item".njk
    f = open(direc, "w+", encoding="utf-8")
    f.write("---\n")
    f.write("title: "+ "{}".format(row[1])+"\n")
    f.write("layout: item.njk"+"\n")
    f.write("price: "+ "{}".format(row[2])+"\n")
    f.write("image: "+ '"'+ "{}".format(row[4])+'"\n')
    f.write("stock: "+ "{}".format(row[3])+"\n")
    f.write("id: "+ "{}".format(row[0])+"\n")
    f.write("---\n")
    f.write('<div class="container">\n')
    f.write("<p>Descripción del producto:</p>\n")
    for i in range(len(row)-5):
        if row[i+5] != "nan":
            f.write("<p>"+"{}".format(row[i+5])+"</p>\n")
    f.write("</div>")
    f.close()

#Reescribe items.njk
direc = "/Users/ksDemon/Documents/DemonLive/src/items.njk"
f = open(direc, "w+", encoding="utf-8")
f.write("---\n")
f.write("title: Items\n")
f.write("layout: store.njk"+"\n")
f.write("---\n")
f.write("<h1>Items</h1>\n")
for ix in df.index:
    row = df.loc[ix].tolist()
    print(row)
    name = row[1].split(" ")
    named = ""
    a = True
    for e in name:
        if a:
            named += e
            a = False
        else:
            named += "-" + e
    f.write('<a href="/items/' + named + '">\n')
    f.write('<div class="item">\n')
    f.write("<p>" + row[1] + "</p>\n")
    f.write('<img class="center-cropped" src="' + row[4] + '"alt="product" width="100%">\n')
    f.write("<p> Precio</p>\n")
    f.write("<p>" + row[2] + "</p>\n")
    f.write("</div>\n")
    f.write("</a>\n")

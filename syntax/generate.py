import json
import re

with open("keywords.json") as f:
    words = json.load(f)

constants = words["booleans"] + words["languageConstants"]
all_keywords = (
    words["declaration"]
    + words["import"]
    + words["control"]
    + words["modifier"]
    + words["operatorWords"]
)
suffixes = words["intSuffixes"] + words["floatSuffixes"]

with open("ripe.tmLanguage.json") as f:
    tm = f.read()

for key, group in [
    ("declaration-keywords", words["declaration"]),
    ("control-keywords", words["control"]),
    ("modifier-keywords", words["modifier"]),
    ("operator-keywords", words["operatorWords"]),
    ("builtin-types", words["builtinTypes"]),
    ("constants", constants),
    ("imports", words["import"]),
]:
    tm = re.sub(
        rf'("{key}":[\s\S]{{0,300}}?"match": "\\\\b\()[^)]*(\))',
        lambda m, g=group: m[1] + "|".join(g) + m[2],
        tm,
        count=1,
    )

# the int and float are apart by suffix
tm = re.sub(
    r"\((?:[a-z0-9]+\|)+[a-z0-9]+\)(?=\?\?|\?\\\\b)",
    lambda m: (
        "("
        + "|".join(
            words["intSuffixes" if words["intSuffixes"][0] in m[0] else "floatSuffixes"]
        )
        + ")"
    ),
    tm,
)
with open("ripe.tmLanguage.json", "w") as f:
    f.write(tm)

prism_rules = [
    (r"('import-path': \{\s*pattern: /\\b\()[^)]*(\))", words["import"] + ["module"]),
    (r"(keyword: /\\b\(\?:)[^)]*(\))", all_keywords),
    (r"(builtin: \{\s*pattern: /\\b\(\?:)[^)]*(\))", words["builtinTypes"]),
    (r"(boolean: /\\b\(\?:)[^)]*(\))", words["booleans"]),
    (r"(constant: /\\b\(\?:)[^)]*(\))", words["languageConstants"]),
    (r"(\(\?:)[^)]*(\)\?\\b/,)", suffixes),
]
with open("prism.js") as f:
    text = f.read()

for pattern, group in prism_rules:
    text = re.sub(pattern, lambda m, g=group: m[1] + "|".join(g) + m[2], text, count=1)

with open("prism.js", "w") as f:
    f.write(text)

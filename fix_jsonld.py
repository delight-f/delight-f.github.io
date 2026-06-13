with open("index.html", "r") as f:
    html = f.read()

# Count JSON-LD blocks
count = html.count("application/ld+json")
print(f"Found {count} JSON-LD blocks")

# If there are 2, keep only the one with &amp;
if count > 1:
    # Find the position of the second JSON-LD block
    first = html.find("application/ld+json")
    second = html.find("application/ld+json", first + 10)

    # Find start of second block (previous <)
    start = html.rfind("<", 0, second)
    # May need to go back further - look for the <script tag
    script_start = html.rfind("<script", 0, second)

    # Find end of second block (next </head> or </script>)
    end_script = html.find("</script>", second)
    end_close = end_script + len("</script>")

    print(f"Removing duplicate from position {script_start} to {end_close}")

    # Remove the second block
    html = html[:script_start] + html[end_close:]

    with open("index.html", "w") as f:
        f.write(html)

    # Verify
    final_count = html.count("application/ld+json")
    print(f"Now {final_count} JSON-LD block(s)")
else:
    print("Only one block - no fix needed")

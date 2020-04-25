from schema import JsonLd
import sys

def main():
    jsonld = JsonLd().fromUrl(sys.argv[1])
    print(jsonld)


if __name__ == "__main__":
    main()

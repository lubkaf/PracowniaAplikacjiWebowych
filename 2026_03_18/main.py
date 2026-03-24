def z4_1():
    wynik = ""
    with open('przyklad.txt', 'r') as plik:
        slowa = [linia.strip() for linia in plik.readlines()]

    for i in range(39, len(slowa), 40):
        slowo = slowa[i]
        wynik += slowo[9]

    print(f"4.1: {wynik}\n")
    with open('wyniki4.txt', 'w') as wyjscie:
        wyjscie.write(f"4.1: {wynik}\n")


def z4_2():
    najwiecej_roznych = 0
    wynik = ""

    with open('przyklad.txt', 'r') as plik:
        for linia in plik:
            slowo = linia.strip()

            liczniki = {}
            for litera in slowo:
                liczniki[litera] = liczniki.get(litera, 0) + 1

            liczba_roznych = len(liczniki)

            if liczba_roznych > najwiecej_roznych:
                najwiecej_roznych = liczba_roznych
                wynik = slowo
        print(f"4.2: {wynik} {najwiecej_roznych}\n")
    with open('wyniki4.txt', 'a') as wyjscie:
        wyjscie.write(f"4.2: {wynik} {najwiecej_roznych}\n")

def z4_3():
    wyniki = []

    with open('przyklad.txt', 'r') as plik:
        for linia in plik:
            slowo = linia.strip()

            kody = [ord(litera) for litera in slowo]

            roznica = max(kody) - min(kody)

            if roznica <= 10:
                wyniki.append(slowo)
    print("4.3:\n")
    for s in wyniki:
        print(f"{s}\n")

    with open('wyniki4.txt', 'a') as wyjscie:
        wyjscie.write("4.3:\n")
        for s in wyniki:
            wyjscie.write(f"{s}\n")

if __name__ == '__main__':
    z4_1()
    z4_2()
    z4_3()


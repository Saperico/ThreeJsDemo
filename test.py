from lib2to3.pgen2.token import STRING
import numbers
import string


class Colors:
    _przykladowe_kolory ={
        "Red" : "#e6194B",
        "Green" : "3cb44b",
        "Yellow" : "#ffe119",
        "Blue" : "#4363d8",
        "Orange" : "#f58231",
        "Purple" : "#911eb4",
        "Cyan" : "#42d4f4",
        "Magneta" : "#f032e6",
        "Lime" : "#bfef45",
        "Pink" : "#fabebe",
        "Teal" : "#469990",
        "Laveder" : "#e6beff",
        "Brown" : "#9A6324",
        "Beige" : "#fffac8",
        "Maroon" : "#800000",

        "Mint" : "#aaffc3",
        "Olive" : "#80800",
        "Apricot" : "#ffd8b1",
        "Navy" : "#000075",
        "Grey" : "#a9a9a9",
        "White" : "ffffff",
        "Black" : "#000000",
        }

    def to_hex(self, color:STRING):
        return self._przykladowe_kolory[color]



s1 = Colors()
print(s1.to_hex("Red"))

class CiagGeometryczny:
    def __init__(self,a1,q,n):
        self.a1 = a1
        self.q = q
        self.n = n
        self.arr = []
        for i in range(n):
            self.arr.append(a1*q**i)

    def add(self):
        x = self.arr[-1]
        x = x * self.q 
        self.arr.append(x)
    
    def print(self):
        print(self.arr)
    
    def rozmiar(self):
        return len(self.arr)

x = CiagGeometryczny(2,2,5)
x.add()
x.add()
x.print()

test1 = CiagGeometryczny(1,3,3)
assert test1.arr == [1,3,9]

class Czas:
    def __init__(self, godzina:int, minuty:int):
        self.godzina = godzina
        self.minuty = minuty
    
    def __init__(self, godzina:string, minuty:string):
        self.godzina = int(godzina)
        self.minuty = int(minuty)

    def __init__(self, czas:string):
        arr = czas.split()
        self.godzina = int(arr[0])
        self.minuty = int(arr[1])

    def __add__(self, other):
        if(self.minuty+ other.minuty > 60):
            self.minuty = self.minuty + other.minuty - 60
            self.godzina += 1
        else: 
            self.minuty = self.minuty + other.minuty
        self.godzina = self.godzina + other.godzina
        return self

    def __sub__(self,other):
        x = self.godzina*60 + self.minuty - other.godzina*60 - other.minuty
        self.godzina = int(x/60)
        self.minuty = x%60
        return self
    
    def __mul__(self, n):
        x = self.minuty * n
        self.godzina = self.godzina * n + int(self.minuty/60)
        self.minuty = x%60
        return self
    def __str__(self):
        return str(self.godzina)+" : " + str(self.minuty)

c  = Czas(1,0)
a = Czas(9,30)
c = c- a 
print(c)

d = Czas("1","20")
print(d)
d= Czas("1 20")
print(d)
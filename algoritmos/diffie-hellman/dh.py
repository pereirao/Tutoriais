import random
import gmpy2

GEN = 7
BASE = 975857477387853487

class author:
    def __init__(self):
        self.secret = random.randint(1, BASE)

    def public_hash(self):
        return (GEN ** self.secret) % BASE
    
    def shared_hash(self, hash):
        return (hash ** self.secret) % BASE

alice = author()
bob = author()

print(alice.secret)
print(alice.public_hash())
print(bob.secret)
print(bob.public_hash())
print("")
print(alice.shared_hash(bob.public_hash()))
print(bob.shared_hash(alice.public_hash()))


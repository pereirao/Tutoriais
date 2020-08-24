import random

GEN = 19
BASE = 97254857

class author:
    def __init__(self):
        self.secret = random.choice(range(1000, 3001))

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


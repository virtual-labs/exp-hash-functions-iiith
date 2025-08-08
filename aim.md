A cryptographic hash function is a mathematical algorithm that takes an input of arbitrary length and produces a fixed-length output called a hash digest. A secure cryptographic hash function must satisfy several essential properties:

(a) **Deterministic**: The same input always produces the same hash output

(b) **Fast computation**: The hash function should be efficiently computable

(c) **Pre-image resistance**: Given a hash output, it should be computationally infeasible to find the original input

(d) **Second pre-image resistance**: Given an input and its hash, it should be infeasible to find a different input with the same hash

(e) **Collision resistance**: It should be computationally infeasible to find two different inputs that produce the same hash output

Hash functions serve as fundamental building blocks in many cryptographic applications, including digital signatures, password storage, and message authentication codes.

In modern cryptography, ensuring data integrity and authenticity is crucial for secure communication systems. Hash functions alone provide integrity checking, but they cannot provide authentication since anyone can compute a hash. In cryptography, we learn that combining hash functions with secret keys through constructions like HMAC (Hash-based Message Authentication Code) enables both integrity verification and authentication.

**About the experiment:**

In this experiment, we work with cryptographic hash functions, specifically SHA-1, and explore their practical applications in message authentication through HMAC. SHA-1 (Secure Hash Algorithm 1) is a widely-used cryptographic hash function that produces a 160-bit hash digest, though it is now considered deprecated due to collision vulnerabilities discovered in recent years. HMAC is a construction that combines a hash function with a secret key to provide both data integrity and authentication, making it essential for secure Internet protocols. Your task is to understand how cryptographic hash functions work and explore their applications. Specifically, you will familiarize yourself with SHA-1 implementation and learn how HMAC uses hash functions to achieve message authentication and data integrity in network communications.

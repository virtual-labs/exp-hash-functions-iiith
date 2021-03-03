1. Familiarize yourself with the working of SHA-1. Though we would be using a dummy hash in the sequel for simplicity, in general, you could be using SHA-1 instead

2. Select a plaintext for which the HMAC tag is to be computed.(by clicking on NextPalintext Button)

3. For simplicity fix l=8 which is default,but it should be l < (length of plaintext)/4.

4. Select an Initialization Vector, IV of length l.by clicking on "Next IV" button)

5. Use the ipad and opad as described in theory part to compute the ciphertext with the help of the hash function provided to you.

6. Divide generated plaintext 'm' into say 'k' chunks of 8 bits and kth chunk will have bits less than 8,to make it 8-bits by padding zeros at end

7. Compute z0="IV||(k XOR ipad)" manually where || impies concatenation and enter z0 in "Your text" field to get z1

8. Compute z1="z0||m1" manually where || impies concatenation and enter z1 in "Your text" field to get z2

9. Repeat above step and finally compute z(k+1)="zk||L" where L=|m|,make L 8-bits by padding zeros to left of it

10. Compute p="IV||(k XOR opad)" manually where || impies concatenation and enter p in "Your text" field to get q

11. Compute r="q||z(k+1)" manually where || impies concatenation and enter 'r' in "Your text" field to get final HMAC tag 't'

12. Notice that z0,z1,z2,.............zk,z(k+1),p,r are all of size '2l'(=16 in our case as l=8).

13. Write the final cipher text 't' in 'Final Output' field and check your answer


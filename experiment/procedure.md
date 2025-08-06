Follow these steps to understand cryptographic hash functions and HMAC construction:

### Part 1: SHA-1 Hash Function Demonstration

#### Step 1: Test SHA-1 Hash Function

- Enter any plaintext message in the **"Plaintext (string)"** field (default: "test")
- Click **"Calculate SHA-1"** to compute the SHA-1 hash
- Observe the 40-character hexadecimal output (160-bit hash)
- **Experiment**: Try different inputs to see how even small changes produce completely different hashes

### Part 2: HMAC Construction with Simplified Hash Function

#### Step 2: Setup HMAC Parameters

- **Message Setup:**

  - Review the binary message in the **"Message (binary)"** field
  - Click **"Generate Random Message"** to try different messages
  - Note: This is the data to be authenticated

- **Block Size Configuration:**

  - Set the **"Block size (l)"** (default: 8, minimum: 8)
  - This determines the hash function's internal block size

- **Initialization Vector (IV):**

  - Review the **"Initialization Vector (IV)"** field
  - Click **"Generate Random IV"** to generate a new random IV of length l
  - The IV initializes the hash function

- **Secret Key:**
  - Review the **"Secret Key (k)"** field
  - Click **"Generate Random Key"** to generate a new random key of length l
  - This key provides authentication (must be kept secret)

#### Step 3: Understand the Dummy Hash Function

- **Test the Hash Function:**
  - Enter a binary string of exactly 2l bits in **"Test Input"** (16 bits for l=8)
  - Click **"Calculate Hash"** to see the result
  - **Hash Logic**: The function XORs adjacent bit pairs: H(b₁b₂b₃b₄) = (b₁⊕b₂)(b₃⊕b₄)
  - **Example**: Input "1100101011001010" → Output "01011100" (for l=8)

#### Step 4: HMAC Calculation Guide

- Click **"Show Step-by-Step Calculation"** to see detailed HMAC computation steps
- **HMAC Algorithm Overview:**
  1. **Inner Padding**: XOR key with ipad (01011100)
  2. **Inner Hash**: Hash(IV || (k ⊕ ipad) || padded_message || message_length)
  3. **Outer Padding**: XOR key with opad (00110110)
  4. **Outer Hash**: Hash(IV || (k ⊕ opad) || inner_hash_result)

#### Step 5: Manual HMAC Calculation

- **Follow the calculation steps shown in the guide:**
  1. Calculate k ⊕ ipad and k ⊕ opad
  2. Pad the message to block boundaries
  3. Append message length in binary
  4. Perform inner hash computation iteratively
  5. Perform outer hash computation
  6. Enter the final result in **"Final HMAC Tag"**

#### Step 6: Verification

- Enter your calculated HMAC result in the **"Final HMAC Tag"** field
- Click **"Check Answer"** to verify correctness
- **Success**: Green checkmark with "CORRECT! Well done!"
- **Error**: Red X with expected vs. actual comparison

### Understanding the Security

- **Hash Function Properties:**

  - **Deterministic**: Same input always produces same output
  - **Fixed Output**: Always produces l-bit output regardless of input size
  - **One-way**: Difficult to find input from hash output

- **HMAC Security:**
  - **Authentication**: Proves the message came from someone with the secret key
  - **Integrity**: Detects any changes to the message
  - **Resistance**: Secure against various cryptographic attacks

### Troubleshooting

- **"Input must be binary"**: Ensure all inputs contain only 0s and 1s
- **"Wrong length"**: Check that inputs match required lengths (l for key/IV, 2l for hash input)
- **"Incorrect answer"**: Review the calculation steps and verify each XOR operation
- **Hash function errors**: Ensure test input is exactly 2l bits long

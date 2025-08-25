function trim(str) {
  return str.replace(/\s+/g, "");
}

var current_l = 8;

function xor_strings(a, b) {
  if (a.length != b.length) {
    alert("Error calculating XOR");
    return;
  }
  var output = "";
  for (var i = 0; i < a.length; i++) {
    if (a[i] == b[i]) {
      output += "0";
    } else {
      output += "1";
    }
  }
  return output;
}

function validate_binary(input) {
  var len = input.length;
  var i;
  for (i = 0; i < len; i++) {
    if (input.charAt(i) != "0" && input.charAt(i) != "1") {
      break;
    }
  }
  if (i < len) {
    return 0;
  }
  return 1;
}

function get_num_in_binary(num) {
  var num_in_binary = "";
  while (num > 0) {
    num_in_binary = (num % 2) + num_in_binary;
    num = Math.floor(num / 2);
  }
  return num_in_binary;
}

function isUnsignedInteger(s) {
  return s.toString().search(/^[0-9]+$/) == 0;
}

function rand_sequence(len) {
  ret = "";
  for (i = 0; i < len; i++) {
    ret += Math.ceil(Math.random() * 1000000) % 2;
  }
  return ret;
}

function next_plain_text() {
  var len = ((Math.random() * 100) % 100) + 2 * current_l;
  document.getElementById("plaintext").value = rand_sequence(len);
}

function next_IV() {
  var l = document.getElementById("l").value;
  if (!isUnsignedInteger(l)) {
    alert("l should be a positive integer");
    return;
  }
  if (l < 8) {
    alert("Please select l >= 8");
    return;
  }
  current_l = l;
  document.getElementById("iv").value = rand_sequence(current_l);
}

function next_Key() {
  var l = document.getElementById("l").value;
  if (!isUnsignedInteger(l)) {
    alert("l should be a positive integer");
    return;
  }
  if (l < 8) {
    alert("Please select l >= 8");
    return;
  }
  current_l = l;
  document.getElementById("key").value = rand_sequence(current_l);
}

function XOR(a, b) {
  if (a == "0" && b == "0") return "0";
  else if (a == "0" && b == "1") return "1";
  else if (a == "1" && b == "0") return "1";
  else if (a == "1" && b == "1") return "0";
  return "0";
}

function hash_function(input) {
  var l = input.length;
  var output = "";
  for (var i = 0; i < l / 2; i++) {
    output += XOR(input.charAt(2 * i), input.charAt(2 * i + 1));
  }
  return output;
}

function get_hash() {
  var input = document.getElementById("usertext").value;
  if (validate_binary(input) == 0) {
    document.getElementById("usertext").value =
      "Please give a binary string of size " + 2 * current_l;
    return;
  }
  var l = input.length;
  if (l != 2 * current_l) {
    document.getElementById("usertext").value =
      "Please give a binary string of size 2l";
    return;
  }
  document.getElementById("hashvalue").value = hash_function(input);
}

function pad_input(input) {
  var numZeroes =
    Math.ceil(input.length / current_l) * current_l - input.length;
  for (var i = 0; i < numZeroes; i++) {
    input += "0";
  }
  return input;
}

function pad_input_before(input) {
  var numZeroes =
    Math.ceil(input.length / current_l) * current_l - input.length;
  for (var i = 0; i < numZeroes; i++) {
    input = "0" + input;
  }
  return input;
}

function pad_iopad(pad) {
  var output = pad;
  var numExtras = Math.ceil(pad.length / current_l) * current_l - pad.length;
  var index = 0;
  for (var i = 0; i < numExtras; i++) {
    output += pad.charAt(index);
    index++;
    if (index == pad.length) {
      index = 0;
    }
  }
  return output;
}

function appendLength() {
  var plaintext = pad_input(document.getElementById("plaintext").value);
  document.getElementById("pt").value = pad_input_before(
    get_num_in_binary(plaintext.length)
  );
}

function pad_plain_text() {
  document.getElementById("plaintext").value = pad_input(
    document.getElementById("plaintext").value
  );
}

function checkAnswer() {
  var user_answer = document.getElementById("cipherarea").value;
  if (user_answer.length == 0) {
    alert("Please enter an answer");
    return;
  }

  var key = document.getElementById("key").value;
  var l = parseInt(document.getElementById("l").value);
  current_l = l;

  // Validate inputs
  if (!validate_binary(key) || key.length != l) {
    alert("Key must be a binary string of length " + l);
    return;
  }

  var kxoripad = xor_strings(key, pad_iopad("01011100"));
  var plaintext = pad_input(document.getElementById("plaintext").value);
  plaintext += pad_input_before(get_num_in_binary(plaintext.length));
  var iv = document.getElementById("iv").value;

  // Validate IV
  if (!validate_binary(iv) || iv.length != l) {
    alert("IV must be a binary string of length " + l);
    return;
  }

  var t = hash_function(iv + kxoripad);
  var numChunks = Math.ceil(plaintext.length / current_l);
  for (var i = 0; i < numChunks; i++) {
    var startIndex = i * current_l;
    var endIndex = Math.min(startIndex + current_l, plaintext.length);
    var chunk = plaintext.substring(startIndex, endIndex);
    // Pad chunk if necessary
    while (chunk.length < current_l) {
      chunk += "0";
    }
    var gethashfor = t + chunk;
    t = hash_function(gethashfor);
  }

  var kxoropad = xor_strings(key, pad_iopad("00110110"));
  var t2 = hash_function(iv + kxoropad);
  t = hash_function(t2 + t);

  if (trim(user_answer) == trim(t)) {
    document.getElementById("notification").innerHTML =
      "<span style='color: green; font-weight: bold;'>✓ CORRECT! Well done!</span>";
    document.getElementById("notification").style.backgroundColor = "#d4edda";
    document.getElementById("notification").style.padding = "10px";
    document.getElementById("notification").style.borderRadius = "5px";
  } else {
    document.getElementById("notification").innerHTML =
      "<span style='color: red; font-weight: bold;'>✗ Incorrect. Try again!</span><br>Expected: " +
      t +
      "<br>Your answer: " +
      user_answer;
    document.getElementById("notification").style.backgroundColor = "#f8d7da";
    document.getElementById("notification").style.padding = "10px";
    document.getElementById("notification").style.borderRadius = "5px";
  }
}

// Helper function to show HMAC calculation steps
function showHMACSteps() {
  var key = document.getElementById("key").value;
  var plaintext = document.getElementById("plaintext").value;
  var iv = document.getElementById("iv").value;
  var l = parseInt(document.getElementById("l").value);

  if (
    !validate_binary(key) ||
    !validate_binary(iv) ||
    !validate_binary(plaintext)
  ) {
    alert("All inputs must be binary strings");
    return;
  }

  var steps =
    "<div style='font-family: monospace; background: #f5f5f5; padding: 10px; margin: 10px 0;'>";
  steps += "<h5>HMAC Calculation Steps:</h5>";

  // Step 1: Pad key if needed
  steps += "<strong>1. Key:</strong> " + key + "<br>";

  // Step 2: XOR with pads
  var ipad = pad_iopad("01011100");
  var opad = pad_iopad("00110110");
  var kxoripad = xor_strings(key, ipad);
  var kxoropad = xor_strings(key, opad);

  steps += "<strong>2. ipad:</strong> " + ipad.substring(0, l) + "<br>";
  steps += "<strong>3. opad:</strong> " + opad.substring(0, l) + "<br>";
  steps += "<strong>4. k ⊕ ipad:</strong> " + kxoripad + "<br>";
  steps += "<strong>5. k ⊕ opad:</strong> " + kxoropad + "<br>";

  // Step 3: Inner hash preparation
  var paddedText = pad_input(plaintext);
  var lengthBinary = pad_input_before(get_num_in_binary(paddedText.length));
  steps += "<strong>6. Padded message:</strong> " + paddedText + "<br>";
  steps += "<strong>7. Length in binary:</strong> " + lengthBinary + "<br>";

  // Step 4: Inner hash calculation
  var innerInput = iv + kxoripad;
  steps +=
    "<strong>8. Inner hash start:</strong> H(" +
    iv +
    " || " +
    kxoripad +
    ") = " +
    hash_function(innerInput) +
    "<br>";

  steps +=
    "<br><em>Continue the calculation manually following the HMAC algorithm...</em>";
  steps += "</div>";

  document.getElementById("hmac-steps").innerHTML = steps;
}

// Summary table update function
function updateSummary() {
  try {
    // Update summary table with current values
    var message = document.getElementById("plaintext").value || "-";
    var blockSize = document.getElementById("l").value || "-";
    var key = document.getElementById("key").value || "-";
    var iv = document.getElementById("iv").value || "-";
    var hmacTag = document.getElementById("cipherarea").value || "-";

    // Update summary table cells
    document.getElementById("summary-message").textContent = message;
    document.getElementById("summary-blocksize").textContent = blockSize;
    document.getElementById("summary-key").textContent = key;
    document.getElementById("summary-iv").textContent = iv;
    document.getElementById("summary-hmac").textContent = hmacTag;

    // Show notification
    var notification = document.getElementById("notification");
    if (notification) {
      notification.className = "notification info";
      notification.textContent = "✅ Summary table updated successfully!";

      // Clear notification after 3 seconds
      setTimeout(function () {
        notification.textContent = "";
        notification.className = "";
      }, 3000);
    }
  } catch (error) {
    console.error("Error updating summary:", error);
  }
}

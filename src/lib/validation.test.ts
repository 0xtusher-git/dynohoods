import assert from "node:assert/strict";
import { test } from "node:test";
import { isValidXPostUrl } from "./validation.ts";

const PASS = [
  "https://x.com/someuser/status/1234567890123456789",
  "https://twitter.com/someuser/status/1234567890123456789",
  "https://x.com/someuser/status/1234567890123456789?s=20",
  "https://x.com/someuser/status/1234567890123456789?ref=abc",
  "https://www.x.com/username/status/1234567890123456789",
  "https://www.twitter.com/username/status/1234567890123456789",
  "https://x.com/someuser/status/1234567890123456789#",
  "  https://x.com/someuser/status/1234567890123456789  ",
];

const FAIL = [
  "https://google.com/someuser/status/123456789",
  "https://example.com/x.com/status/123456789",
  "https://evil-x.com/user/status/123456789",
  "https://x.com/someuser/post/123456789",
  "https://x.com/someuser/status/abc123",
  "https://x.com/status/abc",
  "https://x.com/",
  "not-a-url",
  "",
  "https://evil.com/?redirect=https://x.com/user/status/123",
  "https://x.com.evil.com/user/status/123",
  "https://evilx.com/user/status/123",
  "http://x.com/someuser/status/1234567890123456789",
  "https://x.com/someuser/status/",
];

test("isValidXPostUrl accepts real X/Twitter status URLs", () => {
  for (const url of PASS) {
    assert.equal(isValidXPostUrl(url), true, `expected pass: ${url}`);
  }
});

test("isValidXPostUrl rejects non-post and spoofed URLs", () => {
  for (const url of FAIL) {
    assert.equal(isValidXPostUrl(url), false, `expected fail: ${url}`);
  }
});

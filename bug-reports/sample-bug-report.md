# Bug Report: Payment Confirmation Not Displayed After Successful Checkout

## Environment
- Browsers: Chrome, Firefox, Safari
- OS: macOS Sonoma
- Device: MacBook Pro
- Build: v2.4.1

---

## Steps to Reproduce
1. Navigate to (web address), and provide valid user credentials in the "Username" and "Password" fields (ex. "testuser1@gmail.com", "Testing123!")
2. Select the "Log In" CTA
3. Select any membership plan
4. Proceed to checkout by selecting the "Checkout" CTA
5. Enter valid payment details in all required fields
6. Submit payment by selecting the "Submit" CTA, and:
   i. Observe that the user is directed to a blank page, instead of seeing the expected confirmation screen

---

## Expected Result
User should see a confirmation screen with order summary and receipt details.

---

## Actual Result
Payment processes successfully, but user is redirected to a blank page with no confirmation message.

---

## Severity
P1 – High (blocks user from confirming successful transaction)

---

(bug report also includes a relevant screenshot and/or screen recording, which may include markups done via Zight)

## Notes
- Payment is still processed successfully in backend
- Issue appears intermittent in Safari
- Issue does not occur on Mobile or WIN devices

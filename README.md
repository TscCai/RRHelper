# RRHelper
Relay report helper

### What's this:
This is a javascript-based toolkit to calculate relay protection arguments, especially for regular test.

We mainly focus on line protection, bus differential protection now, and more kinds of protection type may be added in future.

The UI imitates the one on test instrument, and maintain clean and clear.

### What we have now:
1. A UI(RRHelper.html) to calculate voltage when shortcut happens on a line, which can generate the action time delay according to user's input.
2. A line protection library(rrhelper-line.js) which has already implement single phase and double phase shortcut.
3. A vector library(rrhelper-vector.js) provide necessary vector operation function. 
4. A basic library provide a JQuery-like selector and so on.
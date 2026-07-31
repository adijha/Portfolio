---
title: "35 Things That Make Me Delete an App"
description: "35 app UX red flags, ranked by the things that make people instantly lose trust—and a prompt to help your AI coding agent avoid them."
publishedAt: 2026-07-31
draft: false
---

Not every bad UX decision is equally bad. This list starts with the things that make people instantly lose trust—the “I’m deleting this app” moments—and ends with the smaller details that make an app feel polished.

![A phone overwhelmed by permission prompts, loading states, and an offline symbol](/images/blog/app-ux-red-flags-hero.webp)

## 1. A full-screen ad with a fake or tiny close button

Especially when the tiny cross is in the bottom corner, impossible to tap, or opens the App Store instead of closing the ad. That is not monetization; it is a trap.

## 2. Asking for every permission the moment the app opens

I have not seen your app yet, but you want notifications, contacts, location, camera, microphone, and photos. Let me see the value first. Ask in context, right before a feature needs it, and explain why.

## 3. A blank screen when I lose internet

I am in the metro, the signal drops, and your app becomes a white screen. I do not know whether the app is broken, my account is gone, or the internet is off. Show an offline state, cached content if possible, and a retry action.

![A commuter looking at an app that has turned into a blank offline screen on the metro](/images/blog/app-offline-state-metro.webp)

## 4. A full-screen spinner that never explains itself

If I have been staring at a spinning loader for ten seconds, tell me what is loading, whether it is taking longer than usual, and what I can do. Better yet, avoid the full-screen spinner completely.

## 5. Surprise paywalls after I have already invested time

Do not let me fill something out, create something, or get excited about a feature—then reveal that I cannot finish without paying. Be clear about what is free before people do the work.

## 6. A free trial designed to be forgotten

Hidden renewal prices, unclear dates, preselected plans, and cancellation paths buried in settings are all trust killers. A good product should earn the subscription.

## 7. Dark patterns that make leaving harder than joining

Unsubscribe links hidden behind five menus, guilt-copy, misleading labels, or buttons styled to trick me into paying may lift a short-term metric. They also make me warn other people not to use your app.

## 8. Losing my form, draft, cart, or upload because of one error

I filled out a long form and one field is invalid—or the connection drops—and everything is gone. Preserve input, save locally when possible, and let me fix only what is wrong.

## 9. Pressing Back and losing all my progress

This is especially painful in onboarding, checkout, and multi-step forms. Back should return me to where I was, not erase my work or throw me somewhere random.

## 10. An action fails and the app says nothing

No toast, no error, no status—so I tap again. Now I may have placed two orders, sent two messages, or created duplicates. If it fails, say so clearly.

## 11. Every error saying “Something went wrong”

No internet, an expired session, invalid input, and a server outage are different problems. Give me a specific explanation and a next step instead of making me guess.

## 12. Randomly signing me out and destroying my context

If my session expires, do not throw me at a login screen and discard everything I was doing. Preserve the draft or flow, explain what happened, and put me back where I left off.

## 13. A notification that opens the wrong place

You interrupt me with a notification, I tap it, and land on the home screen instead of the exact message, order, comment, or alert. That is a wasted interruption.

## 14. Loud autoplay video or audio

Do not make my phone suddenly speak in a meeting, class, or train. Start media muted, respect device settings, and give people control.

## 15. Notifications that are just noise

“You have a new notification” is not a reason to open an app. Send something timely and useful, say what it is about, and let people control the categories they receive.

## 16. A login flow that fights password managers

Blocking paste, breaking autofill, hiding the keyboard, rejecting copied OTP codes, or giving me 20 seconds to type a code is needless friction at the front door.

## 17. Password requirements revealed only after I fail

Show the rules before I submit. Let me paste. Support password managers. Give me a reveal-password button. Do not make me play password roulette.

## 18. Forcing account creation before I can see any value

If I can browse, preview, or try the core experience without an account, let me. Ask me to sign up when I understand the benefit of doing it.

## 19. Making me confirm every tiny action

When every tap triggers “Are you sure?”, I will stop reading and blindly press confirm. Use confirmations only for real consequences; use Undo for the rest.

## 20. Destructive actions disguised as normal actions

If tapping something permanently deletes data, make that clear. Do not use vague labels or style it exactly like a harmless secondary action.

## 21. No Undo for an easy accidental tap

Archive, remove, unfollow, send, delete, and cancel are often accidental. A short Undo is faster and kinder than a confirmation modal for everyone.

## 22. No optimistic UI for common actions

Likes, saves, follows, toggles, and add-to-cart actions should feel instant. Update the interface immediately, then sync in the background and recover gracefully if it fails.

## 23. A button that does nothing when I tap it

Even when an action needs time, a press needs immediate feedback: a pressed state, progress indicator, or instant UI change. Otherwise I will tap it three more times.

## 24. Spinning loaders where a skeleton would work

If the next screen has a predictable layout, show a skeleton that mirrors it. It feels faster, sets expectations, and avoids the generic “is this app stuck?” spinner.

## 25. Content that jumps around as it loads

Images, ads, and cards appearing late and pushing everything down make an app feel unstable. Reserve the space before the content arrives.

## 26. Refreshing without telling me whether anything happened

If I pull to refresh and there is nothing new, say “You’re up to date.” If refresh failed, say that too. A gesture should have a visible result.

## 27. Search, filters, and scroll position resetting themselves

I open an item, go back, and now I am at the top of the feed with my filters gone. Preserve context so I do not have to find my place again.

## 28. Empty states that give me nowhere to go

“No items” and blank space is not an experience. Explain why this screen is empty and give me an obvious next action: create, search, invite, refresh, or change filters.

## 29. Important actions hidden behind mystery icons

An icon is only useful when people understand it. Add labels when the action is ambiguous—especially when it affects money, data, or account settings.

## 30. Inconsistent primary buttons during onboarding

Keep the Continue button in the same place on every step. Small deviations make a polished flow feel unexpectedly clumsy.

## 31. The back button behaving differently on every screen

Navigation is muscle memory. Back should do the expected thing—not close the app, jump three screens away, or lose my place.

## 32. Different design rules on every screen

Random padding, corner radii, type weights, and button styles make an app feel like several unfinished products stitched together. Use a coherent system.

## 33. Tiny tap targets

If I have to tap a 12-pixel cross three times, the problem is not my finger. Give important controls enough room to be tapped comfortably.

## 34. Accessibility treated as optional

Low contrast, text that cannot scale, color-only status, missing screen-reader labels, and inaccessible forms exclude people—and make the app worse for everyone.

## 35. No clear answer to “what now?”

On every screen, I should quickly understand what is happening, what I can do next, and what happens if the action fails. If I cannot, the interface is making me work too hard.

---

## Make this actionable: give this to your AI coding agent

Before your agent builds a feature—or when you want it to review an existing screen—send it this document with the prompt below. It turns a vague request for “better UX” into a concrete quality check.

![An AI coding assistant reviewing a mobile app screen against a UX checklist](/images/blog/ai-agent-ux-review.webp)

> Review the feature/screen I am building against the attached **35 Things That Make Me Delete an App** checklist. Identify every applicable risk, especially deceptive ads, premature permission requests, offline and slow-network states, loading states, error handling, lost progress, paywalls, navigation, and accessibility. Then implement the fixes. Do not add confirmation dialogs by default; prefer safe optimistic UI and Undo where appropriate. For every network action, define the loading, success, failure, offline, and retry states. Preserve user input and context whenever possible.

You can also add it to your project instructions so your AI coding agent checks for these mistakes by default—not after users complain about them.

---

*Building something? Follow me on [Instagram](https://instagram.com/adijha07) and [Twitter](https://x.com/adijha07) — I document everything.*

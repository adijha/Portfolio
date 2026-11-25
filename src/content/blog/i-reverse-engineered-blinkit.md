---
title: "I Reverse Engineered Blinkit. Here Is What the App Reads From Your Phone."
description: "I decompiled Blinkit's Android app and read the code. It sends your Wi-Fi name with your location, checks for 22 specific apps, grades your battery on API requests, and has a spin wheel whose result comes from the server."
publishedAt: 2026-11-25
draft: false
---

I wanted a Diet Coke. I ended up decompiling the app I was ordering it from.

Without you typing anything, Blinkit's Android app sends enough for a server to guess who else is at home, roughly how old you are, and whether you're in a hurry.

---

## How I did this

I installed Blinkit 18.43.0 from the Play Store on an Android emulator, pulled the APK with `adb`, and decompiled it with JADX and apktool. Free tools. One day of reading.

Blinkit is native Kotlin and Java, so the logic is readable. The build has 23,287 classes. I read the ones that touch your data.

One rule for everything below. The code shows **what the app collects and where it sends it**. It cannot show what Blinkit's servers do with that data. I did not intercept traffic, and I am not saying Blinkit changes your price. Where I guess at a reason, I say it's a guess.

## 1. Your Wi-Fi name goes out with your location

When you pick or change an address, the app fires an analytics event. Here is what goes into it:

```java
// com/blinkit/consumerapp/utils/p.java
map.put("event_name", AnalyticsEvent.LocationChanged.getEvent());
// ...
map.put("new_latitude", address != null ? Double.valueOf(address.getLat()) : obj);
map.put("new_longitude", address != null ? Double.valueOf(address.getLon()) : -1);
// ...
if (strH != null) {
    map.put("ssid", strH);
}
```

`ssid` is your Wi-Fi name. The same field is added to the `OrderAcknowledged` event, which fires when you place an order.

Two accounts, same Wi-Fi name, same coordinates. That's one household, and nobody typed it in.

The fair explanation: the app keeps a small table on your phone that maps a Wi-Fi name to a location, so it can guess you're home without waking up GPS. That table lives on the device. It doesn't explain sending the Wi-Fi name to analytics.

## 2. It checks your phone for 22 specific apps

The code has a fixed map of 22 package names. Some are Blinkit's own builds and Google's apps and services. The rest:

Zomato, District, Bistro, Facebook, Instagram, X, WhatsApp, Gemini and Slack. Plus the Zomato and Blinkit **delivery rider** apps.

Whichever of those you have gets reported to analytics as `installed_applications`. The rider-app check also goes out as a request header, `x-rider-installed`.

Slack is the interesting one. "Has Slack" is a decent signal for "has an office job".

What it does not do: report your whole phone. It asks Android for the installed packages it is allowed to see, then keeps only the ones in the map. And Zepto, Swiggy, Instamart and BigBasket don't appear anywhere in the code. I looked.

## 3. Font size, zoom and screen reader

Every analytics row carries a block of device details. Four of the fields in it:

```java
// com/blinkit/analytics/core/models/b.java
mapBuilder.put("font_scale", Float.valueOf(this.j));
mapBuilder.put("zoom_scale", Float.valueOf(this.k));
mapBuilder.put("is_accessibility_enabled", Boolean.valueOf(this.s));
mapBuilder.put("is_screen_reader_on", Boolean.valueOf(this.t));
```

You know the one phone in your family with giant text? Large font and high zoom are a strong hint that the person holding the phone is older.

There is no age-guessing code in the app. If that happens, it happens on a server I can't see.

One thing people get wrong: the app does not read your screen brightness. The only brightness code I found sets the screen to 100% as a selfie flash in the photo booth feature.

## 4. Your battery gets a grade

```java
// com/blinkit/droiddex/battery/a.java (z means "charging")
if (fIntValue >= 80.0f || (z && fIntValue >= 70.0f)) {
    return PerformanceLevel.EXCELLENT;
}
if (fIntValue >= 55.0f || (z && fIntValue >= 50.0f)) {
    return PerformanceLevel.HIGH;
}
return (fIntValue >= 40.0f || (z && fIntValue >= 35.0f)) ? PerformanceLevel.AVERAGE : PerformanceLevel.LOW;
```

Below 40% and not charging, your phone is `LOW`.

That grade goes into the app's default request headers, with five more:

```java
// com/blinkit/quickdelivery/network/preferences/base/a.java
mapBuilder.put("cpu-level", com.blinkit.droiddex.a.b(0).name());
mapBuilder.put("memory-level", com.blinkit.droiddex.a.b(1).name());
mapBuilder.put("storage-level", com.blinkit.droiddex.a.b(2).name());
mapBuilder.put("network-level", com.blinkit.droiddex.a.b(3).name());
mapBuilder.put("battery-level", com.blinkit.droiddex.a.b(4).name());
mapBuilder.put("thermal-level", com.blinkit.droiddex.a.b(5).name());
```

Processor, RAM, free storage, network, battery, and how hot your phone is. A report card for your phone, attached to API requests.

The fair explanation is performance: send lighter pages to a weak, hot or dying phone. That's a normal thing to build.

But a low battery also means you won't compare prices. You'll just order. **I found no pricing code tied to battery.** The signal is still sent.

## 5. Three smaller ones

**VPN, before you log in.** The login-config call sends a model named `UserCountryFindingFactors`: `is_vpn_connected`, SIM country, network country, IP address, locale, time zone and languages. The name gives away the likely reason: working out your country to decide which login options you get.

**Ringer volume.** When the server sets a flag called `should_send_device_volume`, the app sends `ring_volume_percentage`. My best guess is that it's about whether you'll hear the delivery partner's call. It's still a strange thing for a grocery app to collect.

**Fields named `data1` to `data4`.** The app-launch event sends your locale, every language on your phone, your time zone, and your network and SIM country. The field names are literally `data1`, `data2`, `data3` and `data4`. Names like that tell a reviewer nothing.

## What the server can make the app do

Blinkit's screens are server-driven. The server sends named actions, and the app looks each name up in a table. The main table has 331 names. Most are plumbing: open a page, show a toast.

A few are worth knowing about:

- `open_tip_cart` carries a `default_tip_flag`. The server can pre-select a tip. When I checked on my own account, it wasn't pre-selected.
- `start_timer_action` lets the server start a countdown timer on a screen. I saw none the day I checked.
- `on_back_press_actions` lets the server decide what the back button does on the cart page. Mine worked normally.
- A remote setting named `should_request_notification_permission_until_denied`. Until denied. It is off by default in this build.

And then the spin wheel:

```java
// SpinWheelFragment.java
Integer target = ((SpinWheelActionData) obj).getTarget();
layoutsWheelView.setTarget(target != null ? target.intValue() : -1);
layoutsWheelView.M();
```

The server sends a number called `target`. The wheel spins and stops on it. There is no random-number call anywhere in the spin wheel code.

To be fair, this is how most online prize wheels work. You can't let the phone pick the prize, or people would cheat. And I only found this in code. I have not seen the wheel running in the app. But it's not what you picture when you tap "spin".

## What I looked for and did not find

This list matters as much as the one above.

- No code that changes a price based on your battery, your phone model or anything else. If that exists, it's on the server.
- No check for Zepto, Swiggy or any other competitor.
- No code that pulls your contact list, reads your clipboard or lists your Google accounts in Blinkit's own packages. The contacts permission is used when you pick a contact yourself. I did not sweep the third-party SDKs.
- No on-device ML model, and no "likely to leave" labels.
- The code does try to read your phone's hardware serial number if you grant the phone permission. Android 10 and above refuse that for normal apps.

## What I take from this as an engineer

None of this needed a hack. An APK is public the day you publish it. Anyone with free tools and a free day can read your field names.

Every item above has a boring explanation on its own. Performance tuning. Fraud checks. Cross-promotion. The problem is the sum of it, and that nobody told the person holding the phone.

If you're building an app, here is the rule I'm taking away: if a signal is only needed on the device, keep it on the device. The moment it goes to your server, you owe the user an explanation.

---

**The takeaway**

Collect only what you can explain in one sentence to the person holding the phone. If you can't explain it, don't send it. Somebody will read your code.

Next, I'm opening Zepto.

---

*I analysed one version, Blinkit 18.43.0 for Android, by reading its code. I'm not affiliated with Blinkit. If I got something wrong, tell me and I'll fix it.*

*Building something? Follow me on [Instagram](https://instagram.com/adityajha_builds) and [Twitter](https://x.com/adijha07) — I document everything.*

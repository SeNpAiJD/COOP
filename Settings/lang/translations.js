window.COOP_LANGUAGES = {

  /* ===================== ENGLISH (the original) ===================== */
  en: {
    name:   "English",                     
    badge:  "EN",                          
    sample: "Tap an item to order.",       
    htmlLang: "en",                        
    googleLocale: "en",                    
    strings: {
      // common
      "common.back":    "Back",
      "common.cancel":  "Cancel",
      "common.saved":   "✓ Saved",
      "common.edit":    "Edit",
      "common.delete":  "Delete",
      "common.remove":  "remove",

      // login
      "login.subtitle":        "Sign in with Google to continue",
      "login.googleBtn":       "Sign in with Google",
      "login.nameInstead":     "Sign in with just a name instead",
      "login.yourName":        "Your name",
      "login.namePlaceholder": "e.g. Michael Adrian",
      "login.nameError":       "Please enter your name.",
      "login.continue":        "Continue",
      "login.noClientId":      "Google sign-in isn't set up yet (add GOOGLE_CLIENT_ID in script.js).",
      "login.needsHttp":       "Google sign-in needs the page served over http/https — see the README.",
      "login.offline":         "Couldn't reach Google (offline?).",
      "login.failed":          "Google sign-in failed. Try again, or sign in with just a name.",

      // top-right buttons
      "top.signOut":       "Sign out",
      "top.settings":      "Settings",
      "top.settingsLeave": "Opening Settings will clear the current order. Continue?",

      // header + tabs
      "header.subtitle": "Tap an item, set how many, add it to your order",
      "tabs.order":      "🛒 Order Kiosk",
      "tabs.manage":     "🛠 Manage Products",
      "tabs.promos":     "🏷 Manage Promos",

      // order panel
      "order.title":           "Your Order",
      "order.empty":           "Nothing added yet",
      "order.addDiscount":     "+ Add Discount",
      "order.apply":           "Apply",
      "order.subtotal":        "Subtotal",
      "order.discount":        "Discount",
      "order.discountPercent": "Discount ({value}%)",
      "order.total":           "Total",
      "order.checkout":        "Checkout & Print Receipt",
      "order.examplePercent":  "e.g. 10",
      "order.exampleFixed":    "e.g. 20",

      // product cards
      "card.fresh":            "Fresh",
      "card.addToOrder":       "Add to Order",
      "card.changePrice":      "Change the price for this unit",
      "card.changeUnit":       "Change selling unit",
      "card.customUnit":       "Custom…",
      "card.customUnitPrompt": "Sold per (e.g. sack, tray, box):",

      // manage products
      "products.title":           "Products",
      "products.addNew":          "+ Add New",
      "products.add":             "Add Product",
      "products.edit":            "Edit Product",
      "products.name":            "Name",
      "products.namePlaceholder": "e.g. Sweet Corn",
      "products.price":           "Price (₱)",
      "products.unit":            "Sold per",
      "products.unitPlaceholder": "e.g. kg, piece, bundle",
      "products.picture":         "Picture",
      "products.chooseIcon":      "Choose an icon",
      "products.uploadPhoto":     "Upload a photo",
      "products.errorFields":     "Please fill in a name, price, and unit.",
      "products.errorPicture":    "Please choose an icon or upload a photo.",
      "products.save":            "Save Product",
      "products.empty":           "No products yet — add your first one.",
      "products.confirmDelete":   "Remove \"{name}\" from the product list?",

      // manage promos
      "promos.title":           "Promos",
      "promos.add":             "Add Promo",
      "promos.edit":            "Edit Promo",
      "promos.name":            "Promo Name",
      "promos.namePlaceholder": "e.g. Senior/PWD, Founding Anniversary",
      "promos.type":            "Type",
      "promos.percentOff":      "Percent Off",
      "promos.amountOff":       "Amount Off (₱)",
      "promos.examplePercent":  "e.g. 20",
      "promos.exampleFixed":    "e.g. 20.00",
      "promos.error":           "Please give the promo a name and a value.",
      "promos.save":            "Save Promo",
      "promos.empty":           "No promos yet — add your first one.",
      "promos.percentOffOrder": "{value}% off order",
      "promos.fixedOffOrder":   "₱{value} off order",
      "promos.confirmDelete":   "Remove the \"{name}\" promo?",

      // payment
      "payment.title":        "Payment",
      "payment.subtitle":     "Enter cash received",
      "payment.amountDue":    "Amount Due",
      "payment.cashReceived": "Cash Received (₱)",
      "payment.change":       "Change",
      "payment.stillDue":     "Still Due",
      "payment.error":        "Cash received is less than the amount due.",
      "payment.confirm":      "Confirm Payment",
      "payment.exact":        "Exact",
      "payment.clear":        "Clear",

      // receipt
      "receipt.tagline":      "Fresh goods, honest prices",
      "receipt.total":        "TOTAL",
      "receipt.cashReceived": "Cash Received",
      "receipt.thanks":       "Thanks for stopping by!",
      "receipt.print":        "Print",
      "receipt.newOrder":     "New Order",

      // settings page
      "settings.home":        "← Return to Home",
      "settings.theme":       "Theme",
      "settings.themeSub":    "Change the background color",
      "settings.currentBg":   "Current background",
      "settings.language":    "Language",
      "settings.languageSub": "English, Tagalog, or Ilocano",

      // theme page
      "theme.title": "Background Color",
      "theme.undo":  "↶ Undo",

      // language page
      "lang.title": "Language"
    }
  },

  /* ============================ TAGALOG ============================ */
  tl: {
    name:   "Tagalog",
    badge:  "TL",
    sample: "Pumili ng produkto para mag-order.",
    htmlLang: "tl",
    googleLocale: "fil",
    strings: {
      // common
      "common.back":    "Bumalik",
      "common.cancel":  "Kanselahin",
      "common.saved":   "✓ Na-save",
      "common.edit":    "I-edit",
      "common.delete":  "Burahin",
      "common.remove":  "alisin",

      // login
      "login.subtitle":        "Mag-sign in gamit ang Google para magpatuloy",
      "login.googleBtn":       "Mag-sign in gamit ang Google",
      "login.nameInstead":     "Pangalan na lang ang gamitin sa pag-sign in",
      "login.yourName":        "Ang iyong pangalan",
      "login.namePlaceholder": "hal. Michael Adrian",
      "login.nameError":       "Pakilagay ang iyong pangalan.",
      "login.continue":        "Magpatuloy",
      "login.noClientId":      "Hindi pa naka-set up ang Google sign-in (ilagay ang GOOGLE_CLIENT_ID sa script.js).",
      "login.needsHttp":       "Kailangang naka-http/https ang page para sa Google sign-in — tingnan ang README.",
      "login.offline":         "Hindi maabot ang Google (walang internet?).",
      "login.failed":          "Hindi gumana ang Google sign-in. Subukang muli, o mag-sign in gamit ang pangalan lang.",

      // top-right buttons
      "top.signOut":       "Mag-sign out",
      "top.settings":      "Mga Setting",
      "top.settingsLeave": "Mabubura ang kasalukuyang order kapag binuksan ang Mga Setting. Ituloy?",

      // header + tabs
      "header.subtitle": "Pumili ng produkto, ilagay kung ilan, at idagdag sa order",
      "tabs.order":      "🛒 Mag-order",
      "tabs.manage":     "🛠 Ayusin ang mga Produkto",
      "tabs.promos":     "🏷 Ayusin ang mga Promo",

      // order panel
      "order.title":           "Iyong Order",
      "order.empty":           "Wala pang naidagdag",
      "order.addDiscount":     "+ Magdagdag ng Diskwento",
      "order.apply":           "Ilapat",
      "order.subtotal":        "Subtotal",
      "order.discount":        "Diskwento",
      "order.discountPercent": "Diskwento ({value}%)",
      "order.total":           "Kabuuan",
      "order.checkout":        "Magbayad at I-print ang Resibo",
      "order.examplePercent":  "hal. 10",
      "order.exampleFixed":    "hal. 20",

      // product cards
      "card.fresh":            "Sariwa",
      "card.addToOrder":       "Idagdag sa Order",
      "card.changePrice":      "Palitan ang presyo para sa yunit na ito",
      "card.changeUnit":       "Palitan ang yunit ng benta",
      "card.customUnit":       "Iba pa…",
      "card.customUnitPrompt": "Benta kada (hal. sako, tray, kahon):",

      // manage products
      "products.title":           "Mga Produkto",
      "products.addNew":          "+ Magdagdag",
      "products.add":             "Magdagdag ng Produkto",
      "products.edit":            "I-edit ang Produkto",
      "products.name":            "Pangalan",
      "products.namePlaceholder": "hal. Mais",
      "products.price":           "Presyo (₱)",
      "products.unit":            "Benta kada",
      "products.unitPlaceholder": "hal. kg, piraso, tali",
      "products.picture":         "Larawan",
      "products.chooseIcon":      "Pumili ng icon",
      "products.uploadPhoto":     "Mag-upload ng litrato",
      "products.errorFields":     "Pakilagay ang pangalan, presyo, at yunit.",
      "products.errorPicture":    "Pumili ng icon o mag-upload ng litrato.",
      "products.save":            "I-save ang Produkto",
      "products.empty":           "Wala pang produkto — magdagdag ng una.",
      "products.confirmDelete":   "Alisin ang \"{name}\" sa listahan ng produkto?",

      // manage promos
      "promos.title":           "Mga Promo",
      "promos.add":             "Magdagdag ng Promo",
      "promos.edit":            "I-edit ang Promo",
      "promos.name":            "Pangalan ng Promo",
      "promos.namePlaceholder": "hal. Senior/PWD, Anibersaryo",
      "promos.type":            "Uri",
      "promos.percentOff":      "Bawas na Porsyento",
      "promos.amountOff":       "Bawas na Halaga (₱)",
      "promos.examplePercent":  "hal. 20",
      "promos.exampleFixed":    "hal. 20.00",
      "promos.error":           "Lagyan ng pangalan at halaga ang promo.",
      "promos.save":            "I-save ang Promo",
      "promos.empty":           "Wala pang promo — magdagdag ng una.",
      "promos.percentOffOrder": "{value}% bawas sa order",
      "promos.fixedOffOrder":   "₱{value} bawas sa order",
      "promos.confirmDelete":   "Alisin ang promo na \"{name}\"?",

      // payment
      "payment.title":        "Bayad",
      "payment.subtitle":     "Ilagay ang perang tinanggap",
      "payment.amountDue":    "Babayaran",
      "payment.cashReceived": "Perang Tinanggap (₱)",
      "payment.change":       "Sukli",
      "payment.stillDue":     "Kulang Pa",
      "payment.error":        "Kulang ang perang tinanggap.",
      "payment.confirm":      "Kumpirmahin ang Bayad",
      "payment.exact":        "Eksakto",
      "payment.clear":        "Burahin",

      // receipt
      "receipt.tagline":      "Sariwang paninda, tapat na presyo",
      "receipt.total":        "KABUUAN",
      "receipt.cashReceived": "Perang Tinanggap",
      "receipt.thanks":       "Salamat sa pagbisita!",
      "receipt.print":        "I-print",
      "receipt.newOrder":     "Bagong Order",

      // settings page
      "settings.home":        "← Bumalik sa Tindahan",
      "settings.theme":       "Tema",
      "settings.themeSub":    "Palitan ang kulay ng background",
      "settings.currentBg":   "Kasalukuyang background",
      "settings.language":    "Wika",
      "settings.languageSub": "English, Tagalog, o Ilocano",

      // theme page
      "theme.title": "Kulay ng Background",
      "theme.undo":  "↶ Ibalik",

      // language page
      "lang.title": "Wika"
    }
  },

  /* ============================ ILOCANO ============================ */
  ilo: {
    name:   "Ilocano",
    badge:  "ILO",
    sample: "Agpili iti tagilako tapno ag-order.",
    htmlLang: "ilo",
    googleLocale: "fil",   // Google has no Ilocano button — uses Filipino instead
    strings: {
      // common
      "common.back":    "Agsubli",
      "common.cancel":  "Ikansel",
      "common.saved":   "I-save",
      "common.edit":    "Sukatan",
      "common.delete":  "Ikkaten",
      "common.remove":  "ikkaten",

      // login
      "login.subtitle":        "Ag-sign in usar ti Google account",
      "login.googleBtn":       "Ag-sign in usar ti Google account",
      "login.nameInstead":     "Ag-sign in usar ti nagan laeng",
      "login.yourName":        "Jay nagan mo",
      "login.namePlaceholder": "Kas pangarigan: Michael Adrian",
      "login.nameError":       "Pangaasim ta isuratmo ti naganmo.",
      "login.continue":        "Ituloy",
      "login.noClientId":      "Haan pay a naisagana ti Google sign-in (ikabil ti GOOGLE_CLIENT_ID iti script.js).",
      "login.needsHttp":       "Masapul ti http/https tapno agandar ti Google sign-in — kitaem ti README.",
      "login.offline":         "Saan a madanon ti Google (awan internet?).",
      "login.failed":          "Saan a nagballigi ti Google sign-in. Padasem manen, wenno ag-sign in babaen ti nagan laeng.",

      // top-right buttons
      "top.signOut":       "Ag-sign out",
      "top.settings":      "Settings",
      "top.settingsLeave": "Mapunas ti agdama nga order no luktam ti Settings. Agtuloyka?",

      // header + tabs
      "header.subtitle": "Agpili iti tagilako, isurat no mano, sa ikabil iti ordermo",   // check
      "tabs.order":      "🛒 Ag-order",
      "tabs.manage":     "🛠 Urnosen dagiti Produkto",                                   // check
      "tabs.promos":     "🏷 Urnosen dagiti Promo",                                      // check

      // order panel
      "order.title":           "Ti Ordermo",
      "order.empty":           "Awan pay ti naikabil",
      "order.addDiscount":     "+ Ikabil ti Diskwento",                                    // check
      "order.apply":           "Usaren",
      "order.subtotal":        "Subtotal",
      "order.discount":        "Diskwento",
      "order.discountPercent": "Diskwento ({value}%)",
      "order.total":           "Dagup",
      "order.checkout":        "Agbayad ken I-print ti Resibo",
      "order.examplePercent":  "pagarigan: 10",
      "order.exampleFixed":    "pagarigan: 20",

      // product cards
      "card.fresh":            "Presko",
      "card.addToOrder":       "Ikabil iti Order",
      "card.changePrice":      "Baliwan ti presyo daytoy a yunit",
      "card.changeUnit":       "Baliwan ti yunit ti panaglako",                            // check
      "card.customUnit":       "Sabali pay…",
      "card.customUnitPrompt": "Mailako kada (pagarigan: sako, tray, kahon):",             // check

      // manage products
      "products.title":           "Dagiti Produkto",
      "products.addNew":          "+ Ikabil ti Baro",                                      // check
      "products.add":             "Ikabil ti Produkto",
      "products.edit":            "Baliwan ti Produkto",
      "products.name":            "Nagan",
      "products.namePlaceholder": "pagarigan: Mais",
      "products.price":           "Presyo (₱)",
      "products.unit":            "Mailako kada",                                          // check
      "products.unitPlaceholder": "pagarigan: kg, piraso",
      "products.picture":         "Ladawan",
      "products.chooseIcon":      "Agpili iti icon",
      "products.uploadPhoto":     "Mangi-upload iti retrato",
      "products.errorFields":     "Pangngaasim ta isuratmo ti nagan, presyo, ken yunit.",
      "products.errorPicture":    "Agpili iti icon wenno mangi-upload iti retrato.",
      "products.save":            "Idulin ti Produkto",
      "products.empty":           "Awan pay ti produkto — ikabil ti umuna.",
      "products.confirmDelete":   "Ikkaten ti \"{name}\" iti listaan dagiti produkto?",

      // manage promos
      "promos.title":           "Dagiti Promo",
      "promos.add":             "Ikabil ti Promo",
      "promos.edit":            "Baliwan ti Promo",
      "promos.name":            "Nagan ti Promo",
      "promos.namePlaceholder": "pagarigan: Senior/PWD, Anibersario",
      "promos.type":            "Kita",                                                    // check
      "promos.percentOff":      "Kissay a Porsiento",                                      // check
      "promos.amountOff":       "Kissay a Gatad (₱)",                                      // check
      "promos.examplePercent":  "pagarigan: 20",
      "promos.exampleFixed":    "pagarigan: 20.00",
      "promos.error":           "Pangngaasim ta ikabil ti nagan ken gatad ti promo.",
      "promos.save":            "Idulin ti Promo",
      "promos.empty":           "Awan pay ti promo — ikabil ti umuna.",
      "promos.percentOffOrder": "{value}% kissay iti order",
      "promos.fixedOffOrder":   "₱{value} kissay iti order",
      "promos.confirmDelete":   "Ikkaten ti promo a \"{name}\"?",

      // payment
      "payment.title":        "Bayad",
      "payment.subtitle":     "Isurat ti kuarta a naawat",
      "payment.amountDue":    "Masapul a Bayadan",                                         // check
      "payment.cashReceived": "Kuarta a Naawat (₱)",
      "payment.change":       "Sukli",
      "payment.stillDue":     "Kurang Pay",
      "payment.error":        "Kurang ti kuarta a naawat.",
      "payment.confirm":      "Ikumpirma ti Bayad",
      "payment.exact":        "Eksakto",
      "payment.clear":        "Punasen",

      // receipt
      "receipt.tagline":      "Presko a tagilako, nalinteg a presyo",
      "receipt.total":        "DAGUP",
      "receipt.cashReceived": "Kuarta a Naawat",
      "receipt.thanks":       "Agyamankami iti isasarungkarmo!",
      "receipt.print":        "I-print",
      "receipt.newOrder":     "Baro nga Order",

      // settings page
      "settings.home":        "← Agsubli iti Tienda",
      "settings.theme":       "Tema",
      "settings.themeSub":    "Baliwan ti kolor ti background",
      "settings.currentBg":   "Agdama a background",
      "settings.language":    "Pagsasao",
      "settings.languageSub": "English, Tagalog, wenno Ilocano",

      // theme page
      "theme.title": "Kolor ti Background",
      "theme.undo":  "↶ Isubli",

      // language page
      "lang.title": "Pagsasao"
    }
  }

};

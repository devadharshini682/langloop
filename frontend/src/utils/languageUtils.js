/**
 * Centralized Language Utility for LangLoop
 * Handles:
 * 1. Language normalization (e.g. "Tamil", "ta", "TA" -> "ta")
 * 2. Supported language definitions
 * 3. User language extraction with fallbacks
 * 4. Language matching for deck filtering
 * 5. UI translations for Tamil, Malayalam, Hindi, and English
 */

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "🌐" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
];

/**
 * Normalizes any language string into standard two-letter code.
 * "Tamil", "tamil", "TA", "ta" -> "ta"
 * "Malayalam", "malayalam", "ML", "ml" -> "ml"
 * "Hindi", "hindi", "HI", "hi" -> "hi"
 * "English", "english", "EN", "en" -> "en"
 */
export const normalizeLanguage = (lang) => {
  if (!lang || typeof lang !== "string") {
    return "";
  }

  const clean = lang.trim().toLowerCase();

  if (clean === "ta" || clean === "tamil" || clean.startsWith("ta-") || clean.startsWith("tamil")) {
    return "ta";
  }

  if (clean === "ml" || clean === "malayalam" || clean.startsWith("ml-") || clean.startsWith("malayalam")) {
    return "ml";
  }

  if (clean === "hi" || clean === "hindi" || clean.startsWith("hi-") || clean.startsWith("hindi")) {
    return "hi";
  }

  if (clean === "en" || clean === "english" || clean.startsWith("en-") || clean.startsWith("english")) {
    return "en";
  }

  return clean;
};

/**
 * Extracts and normalizes the learner's active learning language from user object,
 * Redux state, or localStorage. Default fallback is "en".
 */
export const getUserLanguage = (user) => {
  const candidate =
    user?.learningLanguage ||
    user?.nativeLanguage ||
    user?.language ||
    (typeof window !== "undefined" && window.localStorage?.getItem("langloop_learning_language")) ||
    "en";

  const normalized = normalizeLanguage(candidate);
  return normalized || "en";
};

/**
 * Returns human-readable language name in English.
 */
export const getLanguageName = (lang) => {
  const code = normalizeLanguage(lang);
  switch (code) {
    case "ta":
      return "Tamil";
    case "ml":
      return "Malayalam";
    case "hi":
      return "Hindi";
    case "en":
    default:
      return "English";
  }
};

/**
 * Returns native script name for the language.
 */
export const getLanguageNativeName = (lang) => {
  const code = normalizeLanguage(lang);
  switch (code) {
    case "ta":
      return "தமிழ்";
    case "ml":
      return "മലയാളം";
    case "hi":
      return "हिन्दी";
    case "en":
    default:
      return "English";
  }
};

/**
 * Checks if two languages match based on normalized codes.
 * Returns false if either language is missing or null.
 */
export const isSameLanguage = (lang1, lang2) => {
  const n1 = normalizeLanguage(lang1);
  const n2 = normalizeLanguage(lang2);
  if (!n1 || !n2) {
    return false;
  }
  return n1 === n2;
};

/**
 * Centralized learner UI translations
 */
export const translations = {
  en: {
    dashboard: "Dashboard",
    learnerDashboard: "LEARNER DASHBOARD",
    welcomeBack: "Welcome back",
    hello: "Hello",
    myDecks: "My Decks",
    studyDecks: "Study Decks",
    studyNow: "Study Now",
    study: "Study",
    mastery: "Mastery",
    progress: "Progress",
    quickActions: "Quick Actions",
    continueLearning: "Continue Learning",
    keepLearning: "Keep Learning",
    learningCollections: "LEARNING COLLECTIONS",
    learningStreakNotice: "Keep your learning streak going and review your cards before they are forgotten.",
    welcomeJourney: "Welcome back to your language journey.",
    learning: "Learning",
    activeLearningLanguage: "Active Learning Language",
    activeContextNotice: "All your study decks, spaced repetition cards, and mastery metrics are tuned to your progress.",
    readyToStudy: "Ready to study?",
    readyToLearn: "READY TO LEARN?",
    startSession: "Start Session",
    startReview: "Start Review",
    practiceNow: "Practice Now",
    practice: "Practice",
    search: "Search",
    searchDecks: "Search decks",
    browseAllDecks: "Browse All Decks",
    viewDecks: "View Decks",
    view: "View",
    manageCards: "Manage Cards",
    cloneToMyDeck: "Clone to My Deck",
    cloning: "Cloning...",
    deckClonedSuccess: "Deck cloned successfully.",
    createDeck: "Create Deck",
    createNewDeck: "Create New Deck",
    createFirstDeck: "Create Your First Deck",
    noDecksFound: "No decks found.",
    noStudyDecks: "No study decks available yet.",
    totalDecks: "Total Decks",
    totalFlashcards: "Total Flashcards",
    mastered: "Mastered",
    masteredCards: "Mastered Cards",
    dueForReview: "Due for Review",
    dueCards: "Due Cards",
    streak: "Streak",
    learningGoal: "LEARNING GOAL",
    learningProgress: "Learning Progress",
    progressGoalNotice: "Keep reviewing your cards to improve your progress.",
    completed: "completed",
    masteryOverview: "MASTERY OVERVIEW",
    masteryStatus: "Mastery Status",
    masteryNotice: "Cards broken down by backend mastery state",
    viewAllMastery: "View All Mastery",
    checkMastery: "Check Mastery",
    viewProgress: "View Progress",
    inActiveStudy: "In active study",
    completedRetention: "Completed retention",
    readyForReview: "Ready for review",
    reviewQueue: "Review Queue",
    spacedRepetition: "SPACED REPETITION",
    reviewNotice: "Cards that need your attention today.",
    allCaughtUp: "You're all caught up!",
    noCardsWaiting: "There are no cards currently waiting for review.",
    practiceLearningCards: "Practice Learning Cards",
    cards: "cards",
    capacity: "Capacity",
    mentor: "Mentor",
    logout: "Logout",
    loading: "Loading...",
    loadingDashboard: "Loading dashboard...",
    backToDashboard: "Back to Dashboard",
    backToDecks: "Back to Decks",
    showAnswer: "Show Answer",
    nextCard: "Next Card",
    finishStudy: "Finish Study",
    again: "Again",
    hard: "Hard",
    good: "Good",
    easy: "Easy",
    cardDueToday: "cards waiting for review.",
    startLearningSession: "Start a learning session",
    seeFlashcardMastery: "See your flashcard mastery",
    trackLearningAnalytics: "Track your learning analytics",
    masteryLevels: "MASTERY LEVELS",
    yourMastery: "Your Mastery",
    masteryDesc: "See what you've learned and what needs more practice.",
    overallProficiency: "OVERALL PROFICIENCY",
    practiceDueCards: "Practice Due Cards",
    reviewNow: "Review Now",
    cardsDueForReview: "Cards Due for Mastery Review",
    yourFlashcards: "Your Flashcards",
    flashcardMastery: "FLASHCARD MASTERY",
    trackRetention: "Track your retention, flashcard mastery, and study analytics.",
    overallCompletion: "OVERALL COMPLETION",
    deckContentCoverage: "Deck Content Coverage",
    retentionReviewMetrics: "Retention & Review Metrics",
    startReviewSession: "Start Review Session",
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    learnerDashboard: "கற்பவர் டாஷ்போர்டு",
    welcomeBack: "மீண்டும் வருக",
    hello: "வணக்கம்",
    myDecks: "எனது தொகுப்புகள்",
    studyDecks: "படிப்புத் தொகுப்புகள்",
    studyNow: "இப்போது படிக்கவும்",
    study: "படிக்க",
    mastery: "தேர்ச்சி",
    progress: "முன்னேற்றம்",
    quickActions: "விரைவு நடவடிக்கைகள்",
    continueLearning: "கற்றலைத் தொடரவும்",
    keepLearning: "தொடர்ந்து கற்கவும்",
    learningCollections: "கற்றல் தொகுப்புகள்",
    learningStreakNotice: "உங்கள் கற்றல் தொடர்ச்சியைத் தக்க வைத்துக் கொள்ளுங்கள், அட்டைகளை மறப்பதற்கு முன் மதிப்பாய்வு செய்யுங்கள்.",
    welcomeJourney: "உங்கள் மொழி கற்றல் பயணத்திற்கு மீண்டும் வரவேற்கிறோம்.",
    learning: "கற்கிறீர்கள்",
    activeLearningLanguage: "செயலில் உள்ள கற்றல் மொழி",
    activeContextNotice: "உங்கள் அனைத்து படிப்புத் தொகுப்புகளும் மற்றும் நினைவாற்றல் அளவீடுகளும் உங்கள் முன்னேற்றத்திற்கு ஏற்ப அமைக்கப்பட்டுள்ளன.",
    readyToStudy: "படிக்க தயாரா?",
    readyToLearn: "கற்க தயாரா?",
    startSession: "அமர்வைத் தொடங்கு",
    startReview: "மறுபரிசீலனையைத் தொடங்கு",
    practiceNow: "இப்போது பயிற்சி செய்யுங்கள்",
    practice: "பயிற்சி",
    search: "தேடல்",
    searchDecks: "தொகுப்புகளைத் தேடுங்கள்",
    browseAllDecks: "அனைத்து தொகுப்புகளையும் உலாவவும்",
    viewDecks: "தொகுப்புகளைப் பார்க்கவும்",
    view: "பார்க்க",
    manageCards: "அட்டைகளை நிர்வகிக்கவும்",
    cloneToMyDeck: "எனது தொகுப்பிற்கு நகலெடு",
    cloning: "நகலெடுக்கிறது...",
    deckClonedSuccess: "தொகுப்பு வெற்றிகரமாக நகலெடுக்கப்பட்டது.",
    createDeck: "தொகுப்பை உருவாக்கு",
    createNewDeck: "புதிய தொகுப்பை உருவாக்கு",
    createFirstDeck: "உங்கள் முதல் தொகுப்பை உருவாக்கவும்",
    noDecksFound: "தொகுப்புகள் எதுவும் காணப்படவில்லை.",
    noStudyDecks: "படிப்புத் தொகுப்புகள் எதுவும் இன்னும் கிடைக்கவில்லை.",
    totalDecks: "மொத்த தொகுப்புகள்",
    totalFlashcards: "மொத்த அட்டைகள்",
    mastered: "தேர்ச்சி பெற்றது",
    masteredCards: "தேர்ச்சி பெற்ற அட்டைகள்",
    dueForReview: "மறுபரிசீலனைக்கு உரியவை",
    dueCards: "நிலுவையில் உள்ள அட்டைகள்",
    streak: "தொடர்ச்சி",
    learningGoal: "கற்றல் இலக்கு",
    learningProgress: "கற்றல் முன்னேற்றம்",
    progressGoalNotice: "உங்கள் முன்னேற்றத்தை மேம்படுத்த அட்டைகளைத் தொடர்ந்து மதிப்பாய்வு செய்யுங்கள்.",
    completed: "முடிந்தது",
    masteryOverview: "தேர்ச்சி கண்ணோட்டம்",
    masteryStatus: "தேர்ச்சி நிலை",
    masteryNotice: "தேர்ச்சி நிலைக்கு ஏற்ப வகைப்படுத்தப்பட்ட அட்டைகள்",
    viewAllMastery: "அனைத்து தேர்ச்சியையும் காண்க",
    checkMastery: "தேர்ச்சியை சரிபார்க்கவும்",
    viewProgress: "முன்னேற்றத்தைக் காண்க",
    inActiveStudy: "செயலில் உள்ள கற்றலில்",
    completedRetention: "நினைவாற்றல் பூர்த்தியடைந்தது",
    readyForReview: "மறுபரிசீலனைக்கு தயார்",
    reviewQueue: "மறுபரிசீலனை வரிசை",
    spacedRepetition: "இடைவெளி கற்றல்",
    reviewNotice: "இன்று உங்கள் கவனம் தேவைப்படும் அட்டைகள்.",
    allCaughtUp: "அனைத்தும் முடிந்தது!",
    noCardsWaiting: "தற்போது மறுபரிசீலனைக்கு அட்டைகள் எதுவும் காத்திருக்கவில்லை.",
    practiceLearningCards: "கற்றல் அட்டைகளைப் பயிற்சி செய்யுங்கள்",
    cards: "அட்டைகள்",
    capacity: "கொள்ளளவு",
    mentor: "வழிகாட்டி",
    logout: "வெளியேறு",
    loading: "ஏற்றுகிறது...",
    loadingDashboard: "டாஷ்போர்டு ஏற்றுகிறது...",
    backToDashboard: "டாஷ்போர்டுக்குத் திரும்பு",
    backToDecks: "தொகுப்புகளுக்குத் திரும்பு",
    showAnswer: "பதிலைக் காட்டு",
    nextCard: "அடுத்த அட்டை",
    finishStudy: "படிப்பை முடிக்கவும்",
    again: "மீண்டும்",
    hard: "கடினம்",
    good: "நன்று",
    easy: "எளிது",
    cardDueToday: "அட்டைகள் மறுபரிசீலனைக்கு காத்திருக்கின்றன.",
    startLearningSession: "கற்றல் அமர்வைத் தொடங்குங்கள்",
    seeFlashcardMastery: "உங்கள் அட்டை தேர்ச்சியைக் காண்க",
    trackLearningAnalytics: "உங்கள் கற்றல் பகுப்பாய்வைக் கண்காணிக்கவும்",
    masteryLevels: "தேர்ச்சி நிலைகள்",
    yourMastery: "உங்கள் தேர்ச்சி",
    masteryDesc: "நீங்கள் கற்றுக்கொண்டவற்றையும் மேலும் பயிற்சி செய்ய வேண்டியவற்றையும் பார்க்கவும்.",
    overallProficiency: "ஒட்டுமொத்த தேர்ச்சி",
    practiceDueCards: "நிலுவையில் உள்ள அட்டைகளைப் பயிற்சி செய்யுங்கள்",
    reviewNow: "இப்போது மதிப்பாய்வு செய்",
    cardsDueForReview: "தேர்ச்சி மறுபரிசீலனைக்கு உரிய அட்டைகள்",
    yourFlashcards: "உங்கள் அட்டைகள்",
    flashcardMastery: "அட்டை தேர்ச்சி",
    trackRetention: "உங்கள் நினைவாற்றல், அட்டை தேர்ச்சி மற்றும் பகுப்பாய்வைக் கண்காணிக்கவும்.",
    overallCompletion: "ஒட்டுமொத்த நிறைவு",
    deckContentCoverage: "தொகுப்பு உள்ளடக்க கவரேஜ்",
    retentionReviewMetrics: "நினைவாற்றல் மற்றும் மறுபரிசீலனை அளவீடுகள்",
    startReviewSession: "மறுபரிசீலனை அமர்வைத் தொடங்கு",
  },
  ml: {
    dashboard: "ഡാഷ്‌ബോർഡ്",
    learnerDashboard: "പഠിതാവിന്റെ ഡാഷ്‌ബോർഡ്",
    welcomeBack: "വീണ്ടും സ്വാഗതം",
    hello: "നമസ്കാരം",
    myDecks: "എന്റെ ഡെക്കുകൾ",
    studyDecks: "പഠന ഡെക്കുകൾ",
    studyNow: "ഇപ്പോൾ പഠിക്കുക",
    study: "പഠിക്കുക",
    mastery: "മാസ്റ്ററി",
    progress: "പുരോഗതി",
    quickActions: "ദ്രുത പ്രവർത്തനങ്ങൾ",
    continueLearning: "പഠനം തുടരുക",
    keepLearning: "തുടർന്നും പഠിക്കുക",
    learningCollections: "പഠന ശേഖരങ്ങൾ",
    learningStreakNotice: "പഠന സ്ട്രീക്ക് നിലനിർത്തുക, കാർഡുകൾ മറക്കുന്നതിന് മുമ്പ് അവലോകനം ചെയ്യുക.",
    welcomeJourney: "ഭാഷാ പഠന യാത്രയിലേക്ക് വീണ്ടും സ്വാഗതം.",
    learning: "പഠിക്കുന്നത്",
    activeLearningLanguage: "സജീവ പഠന ഭാഷ",
    activeContextNotice: "നിങ്ങളുടെ എല്ലാ പഠന ഡെക്കുകളും പുരോഗതിക്കും അനുസൃതമായി ക്രമീകരിച്ചിരിക്കുന്നു.",
    readyToStudy: "പഠിക്കാൻ തയ്യാറാണോ?",
    readyToLearn: "പഠിക്കാൻ തയ്യാറാണോ?",
    startSession: "സെഷൻ ആരംഭിക്കുക",
    startReview: "അവലോകനം ആരംഭിക്കുക",
    practiceNow: "ഇപ്പോൾ പരിശീലിക്കുക",
    practice: "പരിശീലിക്കുക",
    search: "തിരയുക",
    searchDecks: "ഡെക്കുകൾ തിരയുക",
    browseAllDecks: "എല്ലാ ഡെക്കുകളും ബ്രൗസ് ചെയ്യുക",
    viewDecks: "ഡെക്കുകൾ കാണുക",
    view: "കാണുക",
    manageCards: "കാർഡുകൾ നിയന്ത്രിക്കുക",
    cloneToMyDeck: "എന്റെ ഡെക്കിലേക്ക് ക്ലോൺ ചെയ്യുക",
    cloning: "ക്ലോൺ ചെയ്യുന്നു...",
    deckClonedSuccess: "ഡെക്ക് വിജയകരമായി ക്ലോൺ ചെയ്തു.",
    createDeck: "ഡെക്ക് സൃഷ്ടിക്കുക",
    createNewDeck: "പുതിയ ഡെക്ക് സൃഷ്ടിക്കുക",
    createFirstDeck: "നിങ്ങളുടെ ആദ്യത്തെ ഡെക്ക് സൃഷ്ടിക്കുക",
    noDecksFound: "ഡെക്കുകളൊന്നും കണ്ടെത്തിയില്ല.",
    noStudyDecks: "പഠന ഡെക്കുകളൊന്നും ഇതുവരെ ലഭ്യമല്ല.",
    totalDecks: "ആകെ ഡെക്കുകൾ",
    totalFlashcards: "ആകെ ഫ്ലാഷ് കാർഡുകൾ",
    mastered: "മാസ്റ്റർ ചെയ്തത്",
    masteredCards: "മാസ്റ്റർ ചെയ്ത കാർഡുകൾ",
    dueForReview: "അവലോകനത്തിന് ബാക്കിയുള്ളവ",
    dueCards: "റിവ്യൂ ചെയ്യേണ്ട കാർഡുകൾ",
    streak: "സ്ട്രീക്ക്",
    learningGoal: "പഠന ലക്ഷ്യം",
    learningProgress: "പഠന പുരോഗതി",
    progressGoalNotice: "പുരോഗതി മെച്ചപ്പെടുത്തുന്നതിന് കാർഡുകൾ നിരന്തരം അവലോകനം ചെയ്യുക.",
    completed: "പൂർത്തിയായി",
    masteryOverview: "മാസ്റ്ററി അവലോകനം",
    masteryStatus: "മാസ്റ്ററി നില",
    masteryNotice: "മാസ്റ്ററി നില അനുസരിച്ച് തരംതിരിച്ച കാർഡുകൾ",
    viewAllMastery: "എല്ലാ മാസ്റ്ററിയും കാണുക",
    checkMastery: "മാസ്റ്ററി പരിശോധിക്കുക",
    viewProgress: "പുരോഗതി കാണുക",
    inActiveStudy: "സജീവ പഠനത്തിൽ",
    completedRetention: "പൂർത്തിയായ നിലനിർത്തൽ",
    readyForReview: "അവലോകനത്തിന് തയ്യാറാണ്",
    reviewQueue: "റിവ്യൂ ക്യൂ",
    spacedRepetition: "സ്പേസ്ഡ് റിപ്പറ്റീഷൻ",
    reviewNotice: "ഇന്ന് നിങ്ങളുടെ ശ്രദ്ധ ആവശ്യമുള്ള കാർഡുകൾ.",
    allCaughtUp: "എല്ലാം പൂർത്തിയായി!",
    noCardsWaiting: "നിലവിൽ അവലോകനത്തിനായി കാർഡുകളൊന്നും കാത്തിരിക്കുന്നില്ല.",
    practiceLearningCards: "പഠന കാർഡുകൾ പരിശീലിക്കുക",
    cards: "കാർഡുകൾ",
    capacity: "ശേഷി",
    mentor: "മെന്റർ",
    logout: "ലോഗ് ഔട്ട്",
    loading: "ലോഡ് ചെയ്യുന്നു...",
    loadingDashboard: "ഡാഷ്‌ബോർഡ് ലോഡ് ചെയ്യുന്നു...",
    backToDashboard: "ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങുക",
    backToDecks: "ഡെക്കുകളിലേക്ക് മടങ്ങുക",
    showAnswer: "ഉത്തരം കാണിക്കുക",
    nextCard: "അടുത്ത കാർഡ്",
    finishStudy: "പഠനം പൂർത്തിയാക്കുക",
    again: "വീണ്ടും",
    hard: "കഠിനം",
    good: "നല്ലത്",
    easy: "എളുപ്പം",
    cardDueToday: "കാർഡുകൾ അവലോകനത്തിനായി കാത്തിരിക്കുന്നു.",
    startLearningSession: "ഒരു പഠന സെഷൻ ആരംഭിക്കുക",
    seeFlashcardMastery: "നിങ്ങളുടെ ഫ്ലാഷ് കാർഡ് മാസ്റ്ററി കാണുക",
    trackLearningAnalytics: "പഠന വിശകലനങ്ങൾ ട്രാക്ക് ചെയ്യുക",
    masteryLevels: "മാസ്റ്ററി ലെവലുകൾ",
    yourMastery: "നിങ്ങളുടെ മാസ്റ്ററി",
    masteryDesc: "നിങ്ങൾ പഠിച്ചതും കൂടുതൽ പരിശീലനം ആവശ്യമായതും കാണുക.",
    overallProficiency: "മൊത്തത്തിലുള്ള പ്രാവീണ്യം",
    practiceDueCards: "ഡ്യൂ കാർഡുകൾ പരിശീലിക്കുക",
    reviewNow: "ഇപ്പോൾ അവലോകനം ചെയ്യുക",
    cardsDueForReview: "മാസ്റ്ററി അവലോകനത്തിനുള്ള കാർഡുകൾ",
    yourFlashcards: "നിങ്ങളുടെ ഫ്ലാഷ് കാർഡുകൾ",
    flashcardMastery: "ഫ്ലാഷ് കാർഡ് മാസ്റ്ററി",
    trackRetention: "നിങ്ങളുടെ നിലനിർത്തൽ, ഫ്ലാഷ് കാർഡ് മാസ്റ്ററി, പഠന വിശകലനം എന്നിവ ട്രാക്ക് ചെയ്യുക.",
    overallCompletion: "മൊത്തത്തിലുള്ള പൂർത്തീകരണം",
    deckContentCoverage: "ഡെക്ക് ഉള്ളടക്ക കവറേജ്",
    retentionReviewMetrics: "നിലനിർത്തലും അവലോകന മെട്രിക്‌സും",
    startReviewSession: "അവലോകന സെഷൻ ആരംഭിക്കുക",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    learnerDashboard: "शिक्षार्थी डैशबोर्ड",
    welcomeBack: "वापस स्वागत है",
    hello: "नमस्ते",
    myDecks: "मेरे डेक",
    studyDecks: "अध्ययन डेक",
    studyNow: "अभी अध्ययन करें",
    study: "अध्ययन",
    mastery: "महारत",
    progress: "प्रगति",
    quickActions: "त्वरित क्रियाएं",
    continueLearning: "सीखना जारी रखें",
    keepLearning: "सीखते रहें",
    learningCollections: "शिक्षण संग्रह",
    learningStreakNotice: "अपनी सीखने की लय बनाए रखें और भूलने से पहले अपने कार्ड की समीक्षा करें।",
    welcomeJourney: "अपनी भाषा सीखने की यात्रा में पुनः स्वागत है।",
    learning: "सीख रहे हैं",
    activeLearningLanguage: "सक्रिय सीखने की भाषा",
    activeContextNotice: "आपके सभी अध्ययन डेक और महारत मेट्रिक्स आपकी प्रगति के अनुसार तैयार किए गए हैं।",
    readyToStudy: "अध्ययन के लिए तैयार हैं?",
    readyToLearn: "सीखने के लिए तैयार हैं?",
    startSession: "सत्र प्रारंभ करें",
    startReview: "समीक्षा प्रारंभ करें",
    practiceNow: "अभी अभ्यास करें",
    practice: "अभ्यास",
    search: "खोजें",
    searchDecks: "डेक खोजें",
    browseAllDecks: "सभी डेक ब्राउज़ करें",
    viewDecks: "डेक देखें",
    view: "देखें",
    manageCards: "कार्ड प्रबंधित करें",
    cloneToMyDeck: "मेरे डेक में क्लोन करें",
    cloning: "क्लोनिंग हो रही है...",
    deckClonedSuccess: "डेक सफलतापूर्वक क्लोन किया गया।",
    createDeck: "डेक बनाएं",
    createNewDeck: "नया डेक बनाएं",
    createFirstDeck: "अपना पहला डेक बनाएं",
    noDecksFound: "कोई डेक नहीं मिला।",
    noStudyDecks: "अभी तक कोई अध्ययन डेक उपलब्ध नहीं है।",
    totalDecks: "कुल डेक",
    totalFlashcards: "कुल फ्लैशकार्ड",
    mastered: "महारत हासिल",
    masteredCards: "महारत हासिल कार्ड",
    dueForReview: "समीक्षा के लिए देय",
    dueCards: "समीक्षा के लिए कार्ड",
    streak: "लगातार दिन",
    learningGoal: "सीखने का लक्ष्य",
    learningProgress: "सीखने की प्रगति",
    progressGoalNotice: "अपनी प्रगति सुधारने के लिए नियमित रूप से कार्डों की समीक्षा करें।",
    completed: "पूर्ण",
    masteryOverview: "महारत अवलोकन",
    masteryStatus: "महारत की स्थिति",
    masteryNotice: "महारत स्तर के आधार पर विभाजित कार्ड",
    viewAllMastery: "सभी महारत देखें",
    checkMastery: "महारत जांचें",
    viewProgress: "प्रगति देखें",
    inActiveStudy: "सक्रिय अध्ययन में",
    completedRetention: "पूर्ण प्रतिधारण",
    readyForReview: "समीक्षा के लिए तैयार",
    reviewQueue: "समीक्षा कतार",
    spacedRepetition: "अंतरालीय पुनरावृत्ति",
    reviewNotice: "वे कार्ड जिन पर आज आपके ध्यान की आवश्यकता है।",
    allCaughtUp: "आप पूरी तरह तैयार हैं!",
    noCardsWaiting: "वर्तमान में समीक्षा के लिए कोई कार्ड प्रतीक्षारत नहीं है।",
    practiceLearningCards: "सीखने के कार्डों का अभ्यास करें",
    cards: "कार्ड",
    capacity: "क्षमता",
    mentor: "परामर्शदाता",
    logout: "लॉग आउट",
    loading: "लोड हो रहा है...",
    loadingDashboard: "डैशबोर्ड लोड हो रहा है...",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    backToDecks: "डेक पर वापस जाएं",
    showAnswer: "उत्तर दिखाएं",
    nextCard: "अगला कार्ड",
    finishStudy: "अध्ययन समाप्त करें",
    again: "फिर से",
    hard: "कठिन",
    good: "अच्छा",
    easy: "सरल",
    cardDueToday: "कार्ड समीक्षा के लिए प्रतीक्षारत हैं।",
    startLearningSession: "एक अध्ययन सत्र प्रारंभ करें",
    seeFlashcardMastery: "अपनी फ्लैशकार्ड महारत देखें",
    trackLearningAnalytics: "अपनी सीखने की प्रगति ट्रैक करें",
    masteryLevels: "महारत स्तर",
    yourMastery: "आपकी महारत",
    masteryDesc: "देखें कि आपने क्या सीखा है और क्या अभ्यास की आवश्यकता है।",
    overallProficiency: "समग्र प्रवीणता",
    practiceDueCards: "देय कार्डों का अभ्यास करें",
    reviewNow: "अभी समीक्षा करें",
    cardsDueForReview: "महारत समीक्षा के लिए देय कार्ड",
    yourFlashcards: "आपके फ्लैशकार्ड",
    flashcardMastery: "फ्लैशकार्ड महारत",
    trackRetention: "अपनी धारणा, फ्लैशकार्ड महारत और अध्ययन विश्लेषण ट्रैक करें।",
    overallCompletion: "समग्र पूर्णता",
    deckContentCoverage: "डेक सामग्री कवरेज",
    retentionReviewMetrics: "प्रतिधारण और समीक्षा मेट्रिक्स",
    startReviewSession: "समीक्षा सत्र प्रारंभ करें",
  },
};

/**
 * Returns translated string for key, falling back to English, then the key itself.
 */
export const t = (key, lang = "en") => {
  const code = normalizeLanguage(lang) || "en";
  const dict = translations[code] || translations.en;
  return dict[key] || translations.en[key] || key;
};

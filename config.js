// config.js
// This file makes it easy to manage all the content of the website.
// You can change names, dates, pictures, maps, and music here without touching the HTML.

const WEDDING_CONFIG = {
    couple: {
        groom: "Phanu",
        bride: "Linna",
        subtitleEnglish: "We Are Getting Married",
        subtitleKhmer: "អញ្ជើញចូលរួមពិធីមង្គលការ"
    },

    // Set your wedding date and time (Format: Month DD, YYYY HH:MM:SS)
    weddingDate: "December 31, 2026 07:00:00",

    // Media and Theme
    theme: {
        // Change the background image here
        backgroundMotif: "assets/khmer_motif.png",
        // Change the background music link here (can be an external URL or local file path)
        musicLink: "assets/music/Glomyy Vincent - មនុស្សពិសេស Special Someone (SS) ft. Olica _ Live Acoustic.mp3",
        // Start music at a specific second (e.g., 10 to skip a 10-second intro)
        musicStartTime: 10,

        // Video background for the ticket intro
        ticketVideoBg: "assets/gemini_generated_video_430ac6a0.mp4",

        // Main website video background (inside)
        mainVideoBg: "assets/gemini_generated_video_85038731.mp4"
    },

    // Custom Fonts Upload
    // To use your own fonts, place the font file (e.g. .ttf, .woff) in the "assets/fonts/" folder.
    // Then write the exact file name here. Leave as "" to use the default web fonts.
    customFonts: {
        headingFont: "", // Leave empty to use the ultra-premium Cormorant Garamond web font
        bodyFont: "",    // Leave empty to use the elegant Montserrat web font
        khmerFont: ""    // Leave empty to use the premium Suwannaphum Khmer web font
    },

    // Gallery Images — each item has: src, caption (English), captionKhmer, and date
    // You can add as many as you want here
    gallery: [
        {
            src: "assets/khmer_couple.png",
            caption: "The Beginning",
            captionKhmer: "ការជួបដំបូង",
            date: "202q"
        },
        {
            src: "assets/khmer_couple.png",
            caption: "The Beginning",
            captionKhmer: "ការចាប់ផ្តើម",
            date: "2022"
        },
        {
            src: "assets/khmer_couple.png",
            caption: "Our First Date",
            captionKhmer: "ណាត់ជួបដំបូង",
            date: "2022"
        },
        {
            src: "assets/khmer_couple.png",
            caption: "A Perfect Moment",
            captionKhmer: "ពេលវេលាដ៏ល្អ",
            date: "2023"
        },
        {
            src: "assets/khmer_couple.png",
            caption: "The Proposal",
            captionKhmer: "ការស្នើសុំ",
            date: "2024"
        },
        {
            src: "assets/khmer_couple.png",
            caption: "Engagement Day",
            captionKhmer: "ថ្ងៃភ្ជាប់ពាក្យ",
            date: "2024"
        },
        {
            src: "assets/khmer_couple.png",
            caption: "Forever Together",
            captionKhmer: "រួមជីវិតជារៀងរហូត",
            date: "2026"
        },
    ],

    // Event Details
    events: [
        {
            titleEnglish: "Wedding Ceremony",
            titleKhmer: "ពិធីសូត្រមន្ត និង កាត់សក់",
            icon: "💍",
            time: "7:00 AM - 12:00 PM",
            location: "Bride's Residence, Phnom Penh",
            mapLink: "https://maps.google.com" // Replace with actual Google Maps link
        },
        {
            titleEnglish: "Grand Reception",
            titleKhmer: "ពិធីទទួលភ្ញៀវកិត្តិយស",
            icon: "🥂",
            time: "5:00 PM - 10:00 PM",
            location: "Grand Sokha Hotel, Phnom Penh",
            mapLink: "https://maps.google.com" // Replace with actual Google Maps link
        }
    ]
};

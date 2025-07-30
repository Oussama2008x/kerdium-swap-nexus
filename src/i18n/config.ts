import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        swap: "Swap",
        pool: "Pool",
        stake: "Stake",
        tasks: "Tasks",
        faq: "FAQ",
        about: "About"
      },
      swap: {
        title: "Swap",
        from: "From",
        to: "To",
        max: "MAX",
        selectToken: "Select a token",
        connectWallet: "Connect Wallet",
        nativeToken: "Native Token",
        address: "Address"
      },
      footer: {
        ceo: "CEO",
        comingSoon: "Coming soon",
        monadTestnet: "MONAD TESTNET",
        kardiumExchange: "KARDIUM EXCHANGE"
      },
      faq: {
        title: "Frequently Asked Questions",
        q1: "What is Kerdium Finance?",
        a1: "Kerdium Finance is a decentralized finance platform built on the Monad testnet, providing users with advanced trading capabilities and yield farming opportunities. Our platform combines cutting-edge technology with user-friendly interfaces to deliver the best DeFi experience.",
        q2: "How do I connect my wallet?",
        a2: "Click on the 'Connect Wallet' button in the top right corner of the interface. We support multiple wallets including MetaMask, Coinbase Wallet, Rainbow, Rabby, OKX Wallet, WalletConnect, Bitget, and Phantom. Select your preferred wallet and follow the connection prompts.",
        q3: "What tokens can I trade?",
        a3: "You can trade various tokens on our platform including YAKI, GMON, SHMON, WMON, USDC, USDT, USDM, CHOG, DAK, MOON, BEAN, WETH, WBTC, and the native MON token. All tokens are verified and secure for trading.",
        q4: "How does the swap feature work?",
        a4: "Our swap feature allows you to exchange one token for another instantly. Simply select the token you want to trade from and the token you want to receive, enter the amount, and confirm the transaction. The smart contract will handle the exchange automatically.",
        q5: "Is Kerdium Finance secure?",
        a5: "Yes, security is our top priority. We use audited smart contracts, implement best practices for DeFi protocols, and continuously monitor for potential vulnerabilities. However, please remember that DeFi carries inherent risks.",
        q6: "What are the trading fees?",
        a6: "Our platform uses competitive trading fees that are automatically calculated based on the liquidity pool dynamics. The exact fee structure varies depending on the token pair and market conditions, ensuring optimal pricing for all users."
      },
      privacy: {
        title: "Privacy Policy",
        content: "At Kerdium Finance, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our decentralized finance platform. We believe in transparency and want you to understand exactly how your information is handled when you interact with our services. Our platform operates on blockchain technology, which means that certain transactions and interactions are inherently public and immutable. However, we take additional measures to protect any personal information that you may choose to share with us. We collect minimal personal information, only what is necessary to provide you with the best possible service. This may include wallet addresses for transaction purposes, IP addresses for security and analytics, and any information you voluntarily provide through our support channels. We do not sell, trade, or otherwise transfer your personal information to third parties without your explicit consent, except as described in this policy. We may share information with service providers who assist us in operating our platform, conducting business, or servicing you, as long as those parties agree to keep this information confidential. We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please remember that no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security. You have the right to access, update, or delete your personal information at any time. If you have any questions or concerns about our privacy practices, please contact us through our official channels."
      },
      about: {
        title: "About Kerdium Finance",
        content: "Welcome to Kerdium Finance, a revolutionary decentralized finance platform that aims to transform the way people interact with digital assets and cryptocurrencies. Founded by Oussama Kerd, our platform represents a vision of financial freedom and innovation in the rapidly evolving world of blockchain technology. Oussama Kerd, our CEO and founder, brings years of experience in blockchain development and financial technology to Kerdium Finance. His passion for creating accessible and powerful financial tools drives our mission to build a comprehensive DeFi ecosystem that serves users worldwide. The vision behind Kerdium Finance extends far beyond simple token swapping. We are building a complete financial infrastructure that empowers users to take control of their financial future through decentralized protocols and smart contracts. Our platform is designed to be user-friendly while maintaining the security and transparency that blockchain technology provides. At Kerdium Finance, we believe that everyone should have access to advanced financial tools regardless of their geographical location or traditional banking status. Our goal is to create a truly inclusive financial system that operates 24/7, 365 days a year, without the limitations of traditional banking hours or intermediaries. The cryptocurrency trading community is at the heart of what we do. We are not just building a platform; we are fostering a community of traders, investors, and blockchain enthusiasts who share our vision of a decentralized financial future. Through Kerdium Finance, we aim to provide educational resources, advanced trading tools, and opportunities for users to maximize their potential in the DeFi space. Our commitment to innovation drives us to continuously develop new features and improve existing ones. We listen to our community feedback and incorporate user suggestions into our development roadmap. This collaborative approach ensures that Kerdium Finance evolves with the needs of its users and the broader cryptocurrency ecosystem. Security and transparency are fundamental principles that guide every decision we make. We understand that trust is earned, and we work tirelessly to maintain the highest standards of security for our users' assets and data. Regular audits, code reviews, and security assessments are integral parts of our development process."
      }
    }
  },
  ar: {
    translation: {
      nav: {
        swap: "مبادلة",
        pool: "التجمع",
        stake: "الرهان",
        tasks: "المهام",
        faq: "الأسئلة الشائعة",
        about: "حول"
      },
      swap: {
        title: "مبادلة",
        from: "من",
        to: "إلى",
        max: "الحد الأقصى",
        selectToken: "اختر عملة",
        connectWallet: "ربط المحفظة",
        nativeToken: "العملة الأصلية",
        address: "العنوان"
      },
      footer: {
        ceo: "الرئيس التنفيذي",
        comingSoon: "قريباً",
        monadTestnet: "شبكة موناد التجريبية",
        kardiumExchange: "بورصة كارديوم"
      }
    }
  },
  zh: {
    translation: {
      nav: {
        swap: "交换",
        pool: "流动性池",
        stake: "质押",
        tasks: "任务",
        faq: "常见问题",
        about: "关于"
      },
      swap: {
        title: "交换",
        from: "从",
        to: "到",
        max: "最大",
        selectToken: "选择代币",
        connectWallet: "连接钱包",
        nativeToken: "原生代币",
        address: "地址"
      },
      footer: {
        ceo: "首席执行官",
        comingSoon: "即将推出",
        monadTestnet: "MONAD 测试网",
        kardiumExchange: "KARDIUM 交易所"
      }
    }
  },
  fr: {
    translation: {
      nav: {
        swap: "Échanger",
        pool: "Pool",
        stake: "Mise",
        tasks: "Tâches",
        faq: "FAQ",
        about: "À propos"
      },
      swap: {
        title: "Échanger",
        from: "De",
        to: "Vers",
        max: "MAX",
        selectToken: "Sélectionner un token",
        connectWallet: "Connecter le portefeuille",
        nativeToken: "Token natif",
        address: "Adresse"
      },
      footer: {
        ceo: "PDG",
        comingSoon: "Bientôt disponible",
        monadTestnet: "RÉSEAU TEST MONAD",
        kardiumExchange: "ÉCHANGE KARDIUM"
      }
    }
  },
  et: {
    translation: {
      nav: {
        swap: "Vahetus",
        pool: "Pool",
        stake: "Panus",
        tasks: "Ülesanded",
        faq: "KKK",
        about: "Meist"
      },
      swap: {
        title: "Vahetus",
        from: "Alates",
        to: "Kuni",
        max: "MAX",
        selectToken: "Vali token",
        connectWallet: "Ühenda rahakott",
        nativeToken: "Kohalik token",
        address: "Aadress"
      },
      footer: {
        ceo: "Tegevjuht",
        comingSoon: "Peagi",
        monadTestnet: "MONAD TESTNET",
        kardiumExchange: "KARDIUM VAHETUS"
      }
    }
  },
  es: {
    translation: {
      nav: {
        swap: "Intercambiar",
        pool: "Pool",
        stake: "Apostar",
        tasks: "Tareas",
        faq: "FAQ",
        about: "Acerca de"
      },
      swap: {
        title: "Intercambiar",
        from: "Desde",
        to: "Hacia",
        max: "MÁX",
        selectToken: "Seleccionar token",
        connectWallet: "Conectar billetera",
        nativeToken: "Token nativo",
        address: "Dirección"
      },
      footer: {
        ceo: "CEO",
        comingSoon: "Próximamente",
        monadTestnet: "RED DE PRUEBA MONAD",
        kardiumExchange: "INTERCAMBIO KARDIUM"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
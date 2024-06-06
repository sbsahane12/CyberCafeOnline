const popularDocumentsInIndia = [
    {
      title: "PAN Card Application",
      description: "Apply for a Permanent Account Number (PAN) card for tax purposes.",
      image: "https://t3.ftcdn.net/jpg/03/45/67/40/360_F_345674072_QwzzCNH6PElHQxsow7DtAr50TyGmcYGs.webp",
      price: 500,
      documents: ["Identity Proof", "Address Proof", "Date of Birth Proof"],
      documentCount: 3
    },
    {
      title: "Aadhaar Card Services",
      description: "Get Aadhaar card services such as enrollment, updates, and corrections.",
      image:"https://t3.ftcdn.net/jpg/03/99/82/24/240_F_399822445_pk1SJ0o1vTuRpIti0uh0px5tN2YLN3l3.jpg",
      price: 300,
      documents: ["Identity Proof", "Address Proof"],
      documentCount: 2
    },
    {
      title: "Passport Application",
      description: "Apply for a new passport or renew your existing passport.",
      image:"https://t4.ftcdn.net/jpg/00/80/65/95/240_F_80659599_5SPrCq7oaIcin8BR8iUSxb7zz4IbwcBs.jpg",
      price: 1500,
      documents: ["Identity Proof", "Address Proof", "Date of Birth Proof", "Passport-size Photographs"],
      documentCount: 4
    },
    {
      title: "Voter ID Card Registration",
      description: "Register for a Voter ID card to exercise your right to vote in elections.",
      image:"https://t3.ftcdn.net/jpg/05/62/33/00/240_F_562330067_hdhY57ucttq9PfFi6SooE58bXmIiE21W.jpg",
      price: 200,
      documents: ["Identity Proof", "Address Proof"],
      documentCount: 2
    },
    {
      title: "Driving License Application",
      description: "Apply for a new driving license or renew your existing driving license.",
      image:"https://t3.ftcdn.net/jpg/01/55/55/00/240_F_155550093_33Mv0ZMmcL166eJvK5P38yMbfXsM27Mw.jpg",
      price: 800,
      documents: ["Identity Proof", "Address Proof", "Age Proof"],
      documentCount: 3
    },
    {
      title: "Birth Certificate",
      description: "Request a birth certificate for official identification purposes.",
      image: "https://t4.ftcdn.net/jpg/06/17/32/83/240_F_617328329_lKArBm6C1Lnghyq8PSJJnzFSI1VwOrSn.jpg",
    
      price: 100,
      documents: ["Hospital Records", "Identity Proof of Parents"],
      documentCount: 2
    },
    {
      title: "Death Certificate",
      description: "Obtain a death certificate for legal and administrative purposes.",
      image:"https://t3.ftcdn.net/jpg/02/42/18/84/240_F_242188447_BFnolkR1tAZMkYgAl7U3yQHMMG1nhPHi.jpg",
      price: 100,
      documents: ["Identity Proof of Deceased", "Medical Certificate"],
      documentCount: 2
    },
    {
      title: "Marriage Certificate",
      description: "Get a marriage certificate as proof of marriage for various legal purposes.",
      image:"https://t4.ftcdn.net/jpg/00/03/28/23/240_F_3282385_R1TdeAxUHRbGuajGuZDOCLVJx78fBp.jpg",
      price: 150,
      documents: ["Identity Proof", "Address Proof", "Marriage Invitation or Affidavit"],
      documentCount: 3
    },
    {
      title: "Income Tax Return Filing",
      description: "File your income tax returns online with ease.",
      image:"https://t4.ftcdn.net/jpg/06/05/78/39/240_F_605783950_xqeQjteEY20UcBjndZWBvSpnouAF6xNJ.jpg",
      price: 1000,
      documents: ["Income Statements", "Investment Proofs", "Tax Deduction Proofs"],
      documentCount: 3
    },
    {
      title: "Property Registration",
      description: "Register property documents to establish legal ownership.",
      image:"https://t3.ftcdn.net/jpg/01/81/75/54/240_F_181755401_fErB9KYmWVerm6xwhMSs1KlkzG1JQo5w.jpg",
      price: 2000,
      documents: ["Property Documents", "Identity Proof", "Address Proof"],
      documentCount: 3
    },
    {
      title: "Educational Certificates Verification",
      description: "Verify educational certificates for employment or further studies.",
      image:"https://t3.ftcdn.net/jpg/07/04/75/64/240_F_704756449_RpSJls3fXpq9488j7mRyQi6P10KqVp7j.jpg",
      price: 300,
      documents: ["Academic Certificates", "Identity Proof"],
      documentCount: 2
    },
    {
      title: "Vehicle Registration",
      description: "Register a new vehicle or transfer ownership of an existing vehicle.",
      image: "https://t3.ftcdn.net/jpg/04/17/69/14/240_F_417691439_4BhvRPlPmGB6eQAjpiEZr5NLjujFH5GB.jpg",
      price: 500,
      documents: ["Vehicle Documents", "Identity Proof", "Address Proof"],
      documentCount: 3
    },
    {
      title: "Police Clearance Certificate",
      description: "Obtain a police clearance certificate for various purposes such as employment or immigration.",
      image:"https://t3.ftcdn.net/jpg/05/11/59/22/240_F_511592288_JPs6Kag6WjibQ6XMwyIOcrzlwy0jJOTu.jpg",
      price: 400,
      documents: ["Identity Proof", "Address Proof"],
      documentCount: 2
    },
    {
      title: "Ration Card Services",
      description: "Apply for a new ration card or update existing ration card details.",
      image: "https://t3.ftcdn.net/jpg/00/60/66/04/240_F_60660472_g81AnVh22cQgaVZvxKjaZwdu7xJVNzYt.jpg",
      price: 50,
      documents: ["Identity Proof", "Address Proof"],
      documentCount: 2
    },
    {
      title: "LPG Gas Connection",
      description: "Apply for a new LPG gas connection or transfer existing connection to a new location.",
      image:  "https://t3.ftcdn.net/jpg/04/75/79/80/240_F_475798019_vSwAmSfi5DwruOewo04mVaLwquN8aokT.jpg",
      price: 300,
      documents: ["Identity Proof", "Address Proof"],
      documentCount: 2
    },
    {
      title: "Senior Citizen Card",
      description: "Apply for a senior citizen card to avail benefits and discounts for senior citizens.",
      image: "https://t3.ftcdn.net/jpg/06/22/86/58/240_F_622865885_IcU0DJPvHocQXcRGfQEnTTpb2jvLC6S2.jpg",
      price: 0,
      documents: ["Age Proof", "Identity Proof"],
      documentCount: 2
    },
    {
      title: "Disability Certificate",
      description: "Obtain a disability certificate for availing various disability benefits and services.",
      image:"https://t4.ftcdn.net/jpg/06/50/64/33/240_F_650643330_XO6nLclvlDZn2qsAkmqJCPnFvhehhgxf.jpg",
      price: 0,
      documents: ["Medical Certificates", "Identity Proof"],
      documentCount: 2
    },
    {
      title: "Caste Certificate",
      description: "Apply for a caste certificate for availing reservation benefits and services.",
      image:"https://t3.ftcdn.net/jpg/03/49/36/06/240_F_349360687_IMZ4VBvVXqVu3B0yYFurc2JNz47O6fbE.jpg",
      price: 100,
      documents: ["Identity Proof"],
      documentCount: 1
    },
    {
      title: "Income Certificate",
      description: "Obtain an income certificate for availing various government subsidies and schemes.",
      image: "https://t4.ftcdn.net/jpg/02/50/42/09/240_F_250420907_GpbxFRQcaVtpBb42zvdpbLG4hnJ8mEVt.jpg",
      price: 50,
      documents: ["Income-related Documents", "Identity Proof"],
      documentCount: 2
    },
    {
      title: "Legal Heir Certificate",
      description: "Get a legal heir certificate for inheriting property or claiming benefits on behalf of deceased family members.",
      image:  "https://t4.ftcdn.net/jpg/04/18/13/91/240_F_418139169_XBossPIb8c4e94yk4tdDlvRnkVFaIhgg.jpg",
      price: 200,
      documents: ["Death Certificate", "Relationship Proof", "Identity Proof"],
      documentCount: 3
    }
  ];
  
  module.exports =popularDocumentsInIndia;
  
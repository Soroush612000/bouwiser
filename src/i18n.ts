import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  nl: {
    translation: {
      nav: {
        home: "Home",
        projects: "Mijn projecten",
        marketplace: "Producten",
        compare: "Vergelijken",
        energy: "Energie",
        aiAssistant: "AI-assistent",
        partners: "Partners",
        about: "Over ons",
        contact: "Contact",
        startScan: "Start AI-woningscan",
      },

      products: {
        browseTitle: "Bekijk en vergelijk producten",
        browseDescription:
          "Vergelijk bouwproducten, prijzen en prestaties.",
        categories: {
          insulation: "Isolatie",
          windows: "Ramen",
          flooring: "Vloeren",
          heating: "Verwarming",
          solar: "Zonne-energie",
          materials: "Materialen",
        },
      },

      productsPage: {
        eyebrow: "Producten",
        titleLine1: "Vind en vergelijk",
        titleLine2: "bouwproducten.",
        description:
          "Zoek renovatieproducten, vergelijk specificaties en winkelprijzen en ga daarna verder naar de winkel wanneer je klaar bent.",
        searchPlaceholder: "Zoek producten, merken of materialen...",
        filters: "Filters",
        clear: "Wissen",
        category: "Categorie",
        allCategories: "Alle categorieën",
        subcategory: "Subcategorie",
        allSubcategories: "Alle subcategorieën",
        selectCategoryFirst: "Selecteer eerst een categorie",
        retailer: "Winkel",
        allRetailers: "Alle winkels",
        resultCount_one: "{{count}} product",
        resultCount_other: "{{count}} producten",
        resultsDescription:
          "Vergelijk productinformatie en aanbiedingen van winkels.",
        sort: {
          featured: "Uitgelicht",
          lowestPrice: "Laagste prijs",
          highestPrice: "Hoogste prijs",
          highestRating: "Hoogste beoordeling",
          productName: "Productnaam",
        },
        loading: "Producten laden...",
        loadErrorTitle: "Producten konden niet worden geladen",
        loadErrorMessage: "De productmarktplaats kon niet worden geladen.",
        noMatchingProducts: "Geen passende producten",
        tryChangingFilters: "Pas je zoekopdracht of filters aan.",
        clearFilters: "Filters wissen",
        buildingProduct: "Bouwproduct",
        from: "Vanaf",
        noCurrentOffer: "Momenteel geen winkelprijs beschikbaar",
        material: "Materiaal",
        selected: "Geselecteerd",
        compare: "Vergelijken",
        visitStore: "Bekijk bij winkel",
        noOffer: "Geen aanbod",
        selectedCount_one: "{{count}} product geselecteerd",
        selectedCount_other: "{{count}} producten geselecteerd",
        compareProducts: "Producten vergelijken",
      },


      aiScan: {
        name: "AI-woningscan",
        saveAndExit: "Opslaan en afsluiten",
        loadingDraft: "Je opgeslagen AI-woningscan wordt geladen...",
        overallProgress: "Totale voortgang",
        stepOf: "Stap {{current}} van {{total}}",
        back: "Terug",
        continue: "Doorgaan",
        localSaveNotice:
          "Je voortgang is op dit apparaat opgeslagen. Log in om deze met je Bouwiser-account te synchroniseren.",

        save: {
          unsaved: "Niet-opgeslagen wijzigingen",
          saving: "Opslaan...",
          local: "Op dit apparaat opgeslagen",
          saved: "Voortgang opgeslagen",
        },

        hero: {
          badge: "Persoonlijke AI-beoordeling",
          title: "Analyseer je woning in vijf eenvoudige stappen",
          description:
            "Vertel ons over je woning, energieverbruik en renovatiedoelen. Bouwiser stelt vervolgens een persoonlijk verbeterplan op.",
        },

        stepLabels: {
          step1: "Stap 1",
          step2: "Stap 2",
          step3: "Stap 3",
          step4: "Stap 4",
        },

        steps: {
          property: {
            title: "Woning",
            description: "Basisgegevens",
          },
          photos: {
            title: "Foto's",
            description: "Woningfoto's",
          },
          energy: {
            title: "Energie",
            description: "Verbruiksprofiel",
          },
          goals: {
            title: "Doelen",
            description: "Jouw prioriteiten",
          },
          analysis: {
            title: "Analyse",
            description: "AI-beoordeling",
          },
        },

        property: {
          title: "Vertel ons over je woning",
          description:
            "Vul de basisgegevens in die nodig zijn om je woningprofiel op te stellen.",
          streetAddress: "Straat en huisnummer",
          city: "Plaats",
          cityPlaceholder: "Den Haag",
          postalCode: "Postcode",
          yearBuilt: "Bouwjaar",
          floorArea: "Woonoppervlakte",
          propertyType: "Woningtype",
        },

        propertyTypes: {
          "Detached house": "Vrijstaande woning",
          "Semi-detached house": "Twee-onder-een-kapwoning",
          "Terraced house": "Rijtjeswoning",
          Apartment: "Appartement",
        },

        photos: {
          title: "Upload foto's van je woning",
          description:
            "Duidelijke foto's helpen Bouwiser om renovatiemogelijkheden nauwkeuriger te herkennen.",
          uploading: "Uploaden...",
          uploadedReplace: "Geüpload — klik om te vervangen",
          choosePhoto: "Klik om een foto te kiezen",
          removePhoto: "Foto verwijderen",
          privacy:
            "Foto's worden opgeslagen in de privéopslag van je Bouwiser-project. Elke ingelogde gebruiker heeft alleen toegang tot bestanden in de eigen accountmap.",
        },

        photoCategories: {
          frontFacade: "Voorgevel",
          backFacade: "Achtergevel",
          roof: "Dak",
          windows: "Ramen",
          heatingSystem: "Verwarmingssysteem",
          meterCupboard: "Meterkast",
        },

        energy: {
          title: "Voeg je energiegegevens toe",
          description:
            "Energieverbruik helpt Bouwiser om besparingen en verbeterpotentieel te schatten.",
          currentLabel: "Huidig energielabel",
          selectLabel: "Selecteer energielabel",
          annualGas: "Jaarlijks gasverbruik",
          annualElectricity: "Jaarlijks elektriciteitsverbruik",
          billTitle: "Energierekening of certificaat",
          billDescription:
            "Later kun je een energierekening of officieel energielabelcertificaat uploaden voor een nauwkeurigere analyse.",
        },

        goalsSection: {
          title: "Wat wil je bereiken?",
          description:
            "Selecteer één of meer renovatiedoelen zodat de aanbevelingen aansluiten op jouw prioriteiten.",
        },

        goals: {
          lowerBills: {
            title: "Lagere energierekening",
            description: "Verlaag de maandelijkse kosten voor gas en elektriciteit.",
          },
          comfort: {
            title: "Meer comfort",
            description: "Maak je woning warmer en comfortabeler.",
          },
          homeValue: {
            title: "Woningwaarde verhogen",
            description: "Verbeter de waarde van je woning op lange termijn.",
          },
          solar: {
            title: "Zonnepanelen installeren",
            description: "Wek thuis hernieuwbare elektriciteit op.",
          },
          heatPump: {
            title: "Warmtepomp installeren",
            description: "Stap over op efficiënte, koolstofarme verwarming.",
          },
          insulation: {
            title: "Isolatie verbeteren",
            description: "Verminder warmteverlies via dak, muren en vloer.",
          },
        },

        analysis: {
          readyTitle: "Klaar om je AI-analyse te starten",
          analysingTitle: "Bouwiser analyseert je woning",
          description:
            "Onze AI beoordeelt je woningprofiel, energieverbruik, foto's en renovatiedoelen.",
          progress: "Voortgang analyse",
          start: "Start AI-analyse",
        },

        analysisItems: {
          property: "Woninggegevens controleren",
          energy: "Energieprestaties analyseren",
          insulation: "Isolatiemogelijkheden controleren",
          solar: "Zonnepotentieel inschatten",
          subsidies: "Beschikbare subsidies berekenen",
          recommendations: "Renovatieaanbevelingen opstellen",
        },

        results: {
          complete: "Analyse voltooid",
          title: "Je AI-renovatierapport is klaar",
          description:
            "Bouwiser heeft de meest kansrijke energie- en renovatiemogelijkheden voor je woning geïdentificeerd.",
          confidence: "AI-betrouwbaarheid",
          targetLabel: "Doel-energielabel",
          annualSaving: "Jaarlijkse besparing",
          co2Reduction: "CO₂-reductie",
          viewDashboard: "Bekijk mijn renovatiedashboard",
        },

        errors: {
          chooseImage: "Kies een afbeeldingsbestand.",
          imageTooLarge: "Kies een afbeelding kleiner dan 10 MB.",
          signInForPhotos: "Log in voordat je foto's van de woning uploadt.",
          uploadFailed: "De foto kon niet worden geüpload. Probeer het opnieuw.",
          removeFailed: "De foto kon niet worden verwijderd. Probeer het opnieuw.",
          syncFailed:
            "Je wijzigingen zijn op dit apparaat opgeslagen, maar konden niet met je account worden gesynchroniseerd.",
        },
      },

      aiAssistant: {
        badge: "Bouwiser AI-assistent",
        title: "Renovatieadvies in één gesprek",
        subtitle: "Assistent voor renovatieadvies",
        welcomeTitle: "Waarmee kan ik je helpen bij je renovatie?",
        welcomeDescription:
          "Vraag naar renovatieprioriteiten, energieprestaties, producten, duurzaamheid en indicatieve kosten. Ik kan je helpen mogelijke maatregelen te begrijpen, opties te vergelijken en de volgende stappen voor je woning voor te bereiden.",
        suggestions: {
          first: "Welke renovatie kan ik het beste als eerste doen?",
          energyLabel: "Hoe kan ik mijn energielabel verbeteren?",
          compareRoof: "Vergelijk opties voor dakisolatie",
          subsidies: "Welke subsidies kunnen relevant zijn?",
        },
        placeholder: "Vraag het aan Bouwiser AI...",
        send: "Bericht verzenden",
      },

      energy: {
        hero: {
          eyebrow: "Energieverbetering",
          title: "Verbeter de energieprestatie van je woning.",
          description:
            "Ontdek hoe renovatiemaatregelen het energieverbruik kunnen verlagen, het comfort kunnen verbeteren en kunnen bijdragen aan een beter energielabel.",
          analyse: "Analyseer mijn woning",
          note:
            "Persoonlijke resultaten zijn afhankelijk van de informatie die je over je woning verstrekt.",
        },

        scenario: {
          eyebrow: "Voorbeeld van een woningscenario",
          title: "Bekijk hoe renovatiemaatregelen elkaar kunnen versterken.",
          description:
            "Dit voorbeeld laat zien hoe meerdere verbeteringen samen kunnen bijdragen aan een betere algemene energieprestatie.",
          badge: "Illustratief voorbeeld",
          current: "Huidig voorbeeld",
          labelD: "Label D",
          currentDescription:
            "Het startpunt dat voor dit voorbeeld van het renovatietraject wordt gebruikt.",
          improvements: "Voorbeeldverbeteringen",
          improvementItems: [
            "Verbeter de dakisolatie",
            "Upgrade de beglazing",
            "Verbeter het verwarmingssysteem",
          ],
          potential: "Mogelijk resultaat",
          labelB: "Label B",
          potentialDescription:
            "Mogelijk lager energieverbruik en verbeterd thermisch comfort.",
          note:
            "Resultaten voor het energielabel zijn afhankelijk van de woning, de bestaande bouwkundige kenmerken en de uitgevoerde maatregelen.",
        },

        renovation: {
          eyebrow: "Renovatiemaatregelen",
          title: "Waar kan de energieprestatie verbeteren?",
          description:
            "Verschillende onderdelen van een woning beïnvloeden het energieverbruik en comfort. Bouwiser helpt je begrijpen welke verbeteringen relevant kunnen zijn.",
        },

        impact: {
          high: "Hoog",
          mediumHigh: "Gemiddeld–hoog",
        },

        impactLabel: "{{impact}} effect",

        categories: {
          insulation: "isolatie",
          windows: "ramen",
          heating: "verwarming",
        },

        measures: {
          roof: {
            title: "Dakisolatie",
            description:
              "Verminder warmteverlies via het dak en verbeter het binnencomfort.",
          },
          glazing: {
            title: "Hoogwaardige beglazing",
            description:
              "Verbeter het thermisch comfort en verminder warmteverlies via ramen.",
          },
          heatPump: {
            title: "Hybride warmtepomp",
            description:
              "Verminder het gasverbruik door een warmtepomp te combineren met een bestaande cv-ketel.",
          },
        },

        exploreCategory: "Bekijk {{category}}",

        cta: {
          eyebrow: "Elke woning is anders.",
          title: "Ontdek renovatiemogelijkheden voor je eigen woning.",
          description:
            "Voeg basisinformatie over je woning toe en laat Bouwiser een relevanter startpunt maken voor je renovatiebeslissingen.",
          button: "Start AI-woningscan",
          note:
            "De werkelijke energieprestatie en mogelijke verbeteringen zijn afhankelijk van de individuele woning en de uitgevoerde maatregelen.",
        },
      },


      aboutPage: {
        hero: {
          eyebrow: "Over Bouwiser",
          title:
            "Renovatiebeslissingen slimmer, duidelijker en duurzamer maken",
          description:
            "Bouwiser is een digitaal platform dat renovatiebeslissingen voor woningen in Nederland eenvoudiger en transparanter maakt. Door renovatieadvies, energie-inzichten, product- en materiaalinformatie, vergelijkingstools en leveranciersinformatie samen te brengen, helpt Bouwiser huiseigenaren hun mogelijkheden beter te begrijpen en beter onderbouwde keuzes voor hun woning te maken.",
        },

        pillars: {
          comparison: {
            title: "Vergelijken eenvoudiger maken",
            text:
              "Breng versnipperde informatie over producten, materialen, kosten en renovatie samen in één gestructureerde omgeving.",
          },
          decisions: {
            title: "Slimmere beslissingen ondersteunen",
            text:
              "Combineer woninggegevens, renovatiedoelen en digitale begeleiding om huiseigenaren te helpen relevante opties te herkennen.",
          },
          sustainability: {
            title: "Duurzame renovatie ondersteunen",
            text:
              "Maak energieprestaties, renovatiemaatregelen en duurzame materiaalkeuzes eenvoudiger te begrijpen en te vergelijken.",
          },
          transparency: {
            title: "Transparantie verbeteren",
            text:
              "Bied duidelijkere informatie over producten, specificaties, leveranciers, kosten en prestaties.",
          },
        },

        vision: {
          eyebrow: "Onze visie",
          title: "Een slimmer en beter verbonden renovatie-ecosysteem",
          description:
            "Bouwiser wil een transparante digitale omgeving creëren waarin huiseigenaren van het begrijpen van hun renovatiebehoeften kunnen doorgaan naar het verkennen van geschikte maatregelen, het vergelijken van producten en materialen en het vinden van relevante leveranciers en renovatieprofessionals.",
        },
      },


      partnersPage: {
        hero: {
          eyebrow: "Leveranciers- & partnernetwerk",
          titleLine1: "Verbind renovatieproducten",
          titleLine2: "met huiseigenaren.",
          description:
            "Bouwiser brengt fabrikanten, leveranciers en renovatieprofessionals samen in één gestructureerde omgeving waar huiseigenaren producten kunnen verkennen, opties kunnen begrijpen en hun volgende renovatiestappen kunnen plannen.",
        },

        network: {
          eyebrow: "Partnernetwerk",
          title: "Gebouwd voor het renovatie-ecosysteem.",
          description:
            "Bouwiser is ontworpen om de verschillende partijen die betrokken zijn bij woningrenovatie met elkaar te verbinden via duidelijkere informatie en een meer gestructureerde klantreis voor huiseigenaren.",
        },

        types: {
          manufacturers: {
            title: "Fabrikanten",
            description:
              "Presenteer bouwproducten met duidelijke specificaties, prestatie-informatie en relevante renovatietoepassingen.",
          },
          suppliers: {
            title: "Leveranciers",
            description:
              "Help huiseigenaren beschikbare producten te ontdekken en geschikte opties te vergelijken binnen één gestructureerde omgeving.",
          },
          professionals: {
            title: "Renovatieprofessionals",
            description:
              "Verbind renovatie-expertise met huiseigenaren die actief verbeteringen aan hun woning plannen.",
          },
        },

        value: {
          eyebrow: "Waarom samenwerken met Bouwiser?",
          title:
            "Een duidelijkere route van productinformatie naar renovatiebeslissingen.",
          description:
            "Bouwiser wil renovatie-informatie nuttiger maken voor huiseigenaren en tegelijkertijd zakelijke partners een gestructureerde manier bieden om relevante producten en expertise te presenteren.",
        },

        benefits: {
          visibility: {
            title: "Productzichtbaarheid",
            description:
              "Maak producten gemakkelijker vindbaar binnen relevante renovatiecategorieën en klantreizen van huiseigenaren.",
          },
          comparison: {
            title: "Gestructureerd vergelijken",
            description:
              "Presenteer productinformatie in een consistente vorm die huiseigenaren helpt opties te begrijpen en te vergelijken.",
          },
          connections: {
            title: "Relevante connecties met huiseigenaren",
            description:
              "Bereik huiseigenaren op het moment dat zij renovatiemaatregelen, producten en vervolgstappen onderzoeken.",
          },
        },

        cta: {
          eyebrow: "Word onderdeel van het Bouwiser-netwerk",
          title: "Interesse om partner van Bouwiser te worden?",
          description:
            "Fabrikanten, leveranciers en renovatieprofessionals kunnen contact opnemen met Bouwiser om productzichtbaarheid, samenwerking en deelname aan het platform te bespreken.",
          button: "Neem contact op met Bouwiser",
        },
      },


      contactPage: {
        hero: {
          eyebrow: "Contact Bouwiser",
          title: "Vragen, feedback of interesse in samenwerking?",
          description:
            "We verwelkomen vragen en feedback van huiseigenaren, leveranciers, fabrikanten en renovatieprofessionals.",
        },

        general: {
          title: "Algemene vragen",
        },

        partners: {
          title: "Vragen van leveranciers & partners",
          description:
            "Fabrikanten, leveranciers en renovatieprofessionals",
        },

        form: {
          name: "Naam",
          namePlaceholder: "Je naam",
          email: "E-mail",
          subject: "Onderwerp",
          subjectPlaceholder: "Waar wil je het over hebben?",
          message: "Bericht",
          messagePlaceholder: "Vertel ons hoe we kunnen helpen...",
          button: "Neem contact op met Bouwiser",
          note:
            "Als je op de knop klikt, wordt je e-mailprogramma geopend met een voorbereid bericht voor Bouwiser.",
        },

        email: {
          defaultSubject: "Vraag via de Bouwiser-website",
          name: "Naam",
          email: "E-mail",
          message: "Bericht",
          notProvided: "Niet opgegeven",
          noMessage: "Geen bericht opgegeven",
        },
      },


      loginModal: {
        trigger: "Inloggen",
        close: "Authenticatievenster sluiten",

        login: {
          title: "Welkom terug",
          description: "Log in om je renovatieprojecten te beheren.",
        },

        signup: {
          title: "Maak je account aan",
          description:
            "Maak je Bouwiser-account aan en start je renovatietraject.",
        },

        fields: {
          fullName: "Volledige naam",
          fullNamePlaceholder: "Je volledige naam",
          email: "E-mailadres",
          password: "Wachtwoord",
          passwordPlaceholder: "Minimaal 8 tekens",
        },

        togglePassword: "Wachtwoord tonen of verbergen",

        actions: {
          pleaseWait: "Even geduld...",
          login: "Inloggen bij Bouwiser",
          createAccount: "Account aanmaken",
        },

        switch: {
          noAccount: "Nog geen account?",
          haveAccount: "Heb je al een account?",
          createAccount: "Account aanmaken",
          login: "Inloggen",
        },

        messages: {
          accountCreated:
            "Account aangemaakt. Controleer je e-mail en bevestig je account.",
          genericError: "Er is iets misgegaan. Probeer het opnieuw.",
        },
      },

      dashboard: {
        defaultUser: "Huiseigenaar",
        home: "Woning",
        unknownCity: "Onbekende plaats",
        toBeEstimated: "Nog te bepalen",
        reviewAiRecommendations: "Bekijk de AI-renovatieaanbevelingen",

        loading: "Je Bouwiser-werkruimte wordt geladen...",
        eyebrow: "Dashboardoverzicht",
        welcomeBack: "Welkom terug, {{name}}",
        description:
          "Beheer renovatieprojecten, AI-rapporten en energieverbeteringen.",
        newProject: "Nieuw project",

        stats: {
          activeProjects: "Actieve projecten",
          totalProjects_one: "{{count}} project in totaal",
          totalProjects_other: "{{count}} projecten in totaal",
          aiReports: "AI-rapporten",
          averageConfidence: "{{score}}% gemiddelde betrouwbaarheid",
          estimatedSavings: "Geschatte besparingen",
          expectedAnnualSavings: "Verwachte jaarlijkse besparingen",
          averageAiScore: "Gemiddelde AI-score",
          acrossAllProjects: "Over alle projecten",
        },

        activeProjects: "Actieve projecten",
        renovationProgress: "Renovatievoortgang",
        monitorProjects:
          "Volg elk project en ga verder vanaf de huidige fase.",
        viewAllProjects: "Bekijk alle projecten",
        estimatedBudget: "Geschat budget",
        projectProgress: "Projectvoortgang",
        openProject: "Project openen",

        portfolioPerformance: "Portefeuilleprestaties",
        averageProjectProgress: "Gemiddelde projectvoortgang",
        portfolioCompletion: "Voltooiing portefeuille",
        annualSavings: "Jaarlijkse besparingen",
        co2Reduction: "CO₂-reductie",
        bestPerformingProject: "Best presterende project",
        completed: "voltooid",
      },

      dashboardSidebar: {
        smartPlatform: "Slim renovatieplatform",
        workspace: "Werkruimte",
        notifications: "Meldingen",

        menu: {
          dashboard: "Dashboard",
          projects: "Mijn projecten",
          myHome: "Mijn woning",
          aiAssistant: "AI-assistent",
          products: "Producten",
          contractors: "Aannemers",
          reports: "Rapporten",
        },

        aiScore: {
          title: "AI-renovatiescore",
          high: "Hoog",
          confidence: "Betrouwbaarheidsscore",
          description:
            "Je renovatieplan heeft een AI-analyse met hoge betrouwbaarheid.",
          viewReport: "Bekijk AI-rapport",
        },

        subsidies: "Subsidies",
        settings: "Instellingen",
        homeowner: "Huiseigenaar",
        openProfileSettings: "Profielinstellingen openen",
        logout: "Uitloggen",
      },











      budgetCard: {
        eyebrow: "Projectbudget",
        title: "Financieel overzicht",
        description:
          "Bekijk de geplande investering, geschatte subsidie, jaarlijkse besparingen en verwachte terugverdientijd.",
        subsidyCoverage: "{{percentage}}% subsidiedekking",
        totalBudget: "Totaal budget",
        plannedInvestment: "Geplande renovatie-investering",
        estimatedSubsidy: "Geschatte subsidie",
        governmentSupport: "Mogelijke overheidssteun",
        annualSaving: "Jaarlijkse besparing",
        yearlyEnergySaving: "Verwachte jaarlijkse energiebesparing",
        paybackPeriod: "Terugverdientijd",
        estimatedReturn: "Geschat rendement op investering",
        netInvestment: "Netto-investering",
        afterSubsidy: "Totaal budget na geschatte subsidie",
        subsidyContribution: "Bijdrage subsidie",
        insightEyebrow: "Financieel inzicht",
        affordability: "Betaalbaarheid renovatie",
        insightDescription:
          "Het huidige renovatieplan combineert subsidiesteun en verwachte jaarlijkse besparingen om de effectieve investering te verlagen.",
        grossInvestment: "Bruto-investering",
        subsidyReduction: "Subsidievermindering",
        values: {
          toBeEstimated: "Nog te bepalen",
        },
      },

      activityFeed: {
        eyebrow: "Recente activiteit",
        title: "Laatste projectupdates",
        description:
          "Bekijk recente AI-analyses, geüploade documenten, offertes en voltooide taken.",
        viewAll: "Alle activiteiten bekijken",
        types: {
          ai: "AI",
          document: "Document",
          quote: "Offerte",
          task: "Taak",
        },
        items: {
          aiCompleted: {
            title: "AI-analyse voltooid",
            description: "De AI-renovatieanalyse voor deze woning is voltooid.",
          },
          documentUploaded: {
            title: "Document geüpload",
            description: "Er is een nieuw projectdocument toegevoegd.",
          },
          quoteReceived: {
            title: "Offerte ontvangen",
            description:
              "Een nieuwe offerte van een aannemer staat klaar om te bekijken.",
          },
          taskCompleted: {
            title: "Taak voltooid",
            description: "Een renovatietaak is als voltooid gemarkeerd.",
          },
        },
      },

      timeline: {
        eyebrow: "Projecttijdlijn",
        title: "Renovatietraject",
        description:
          "Volg elke fase van de woninganalyse tot en met de uiteindelijke installatie.",
        status: {
          completed: "Voltooid",
          current: "Huidig",
          upcoming: "Aankomend",
        },
        items: {
          propertyAnalysis: {
            title: "Woninganalyse",
            description: "Woninggegevens en energieprestatie geanalyseerd.",
          },
          aiPlan: {
            title: "AI-renovatieplan",
            description:
              "Aanbevolen renovatiemaatregelen gegenereerd op basis van het woningprofiel.",
          },
          productSelection: {
            title: "Productselectie",
            description:
              "Vergelijk geschikte producten en aanbiedingen van winkels.",
          },
          installation: {
            title: "Installatie",
            description:
              "Plan en voltooi de geselecteerde renovatiemaatregelen.",
          },
        },
      },

      aiRecommendations: {
        eyebrow: "AI-aanbevelingen",
        title: "Beste verbeteringen voor deze woning",
        description:
          "Aanbevelingen worden gerangschikt op basis van de geschatte investering, jaarlijkse energiebesparing en verwachte terugverdientijd.",
        viewFullReport: "Volledig AI-rapport bekijken",
        priorityLabel: "{{priority}} prioriteit",
        cost: "Kosten",
        saving: "Besparing",
        payback: "Terugverdientijd",
        viewProducts: "Aanbevolen producten bekijken",
        priority: {
          high: "Hoge",
          medium: "Gemiddelde",
          low: "Lage",
        },
        status: {
          completed: "Voltooid",
          planned: "Gepland",
          recommended: "Aanbevolen",
        },
        categories: {
          insulation: "Isolatie",
          windows: "Ramen",
          heating: "Verwarming",
          solar: "Zonne-energie",
        },
        items: {
          roofInsulation: "Dakisolatie",
          tripleGlazing: "Driedubbel glas",
          hybridHeatPump: "Hybride warmtepomp",
          solarPanels: "Zonnepanelen",
        },
      },

      energyCard: {
        eyebrow: "AI-energieanalyse",
        title: "Energieprestatie",
        description:
          "AI voorspelt aanzienlijke verbeteringen na uitvoering van het aanbevolen renovatieplan.",
        current: "Huidig",
        predicted: "Verwacht",
        renovationProgress: "Renovatievoortgang",
        co2Reduction: "CO₂-reductie",
        aiConfidence: "AI-betrouwbaarheid",
      },

      projectSummary: {
        eyebrow: "Projectoverzicht",
        title: "Samenvatting woningrenovatie",
        description:
          "Bekijk de woninggegevens, het renovatiedoel en de volgende aanbevolen actie.",
        propertyType: "Woningtype",
        constructionYear: "Bouwjaar",
        floorArea: "Woonoppervlakte",
        location: "Locatie",
        nextBestAction: "Volgende beste actie",
        recommendationDescription:
          "Deze aanbeveling is gebaseerd op de verwachte energie-impact, het investeringsniveau en de geschatte terugverdientijd.",
        reviewRecommendation: "Aanbeveling bekijken",
        renovationTarget: "Renovatiedoel",
        improveEnergyPerformance: "Energieprestatie verbeteren",
        current: "Huidig",
        target: "Doel",
        projectProgress: "Projectvoortgang",
        values: {
          home: "Woning",
        },
        propertyTypes: {
          detached: "Vrijstaande woning",
          semiDetached: "Twee-onder-een-kapwoning",
          terraced: "Rijtjeswoning",
          apartment: "Appartement",
        },
        status: {
          aiAnalysisCompleted: "AI-analyse voltooid",
          aiScanInProgress: "AI-woningscan bezig",
          aiAnalysisPending: "AI-analyse in afwachting",
        },
        nextActions: {
          reviewRecommendations: "Bekijk de AI-renovatieaanbevelingen",
          continueAiScan: "Ga verder met AI-woningscan",
        },
      },

      projectKpis: {
        overview: "Overzicht",
        estimatedBudget: "Geschat budget",
        totalPlannedInvestment: "Totale geplande investering",
        availableSubsidy: "Beschikbare subsidie",
        estimatedEligibleSupport: "Geschatte beschikbare ondersteuning",
        annualSaving: "Jaarlijkse besparing",
        expectedYearlyEnergySaving: "Verwachte jaarlijkse energiebesparing",
        returnOnInvestment: "Terugverdientijd",
        estimatedPaybackPeriod: "Geschatte terugverdientijd",
      },

      projectTabs: {
        overview: "Overzicht",
        aiReport: "AI-rapport",
        photos: "Foto's",
        documents: "Documenten",
        quotes: "Offertes",
        tasks: "Taken",
        budget: "Budget",
      },

      projectHeader: {
        backToProjects: "Terug naar projecten",
        share: "Delen",
        moreActions: "Meer projectacties",
        built: "Gebouwd in {{year}}",

        currentLabel: "Huidig label",
        currentPerformance: "Huidige prestatie",
        beforeImprovements: "Voor verbeteringen",

        targetLabel: "Doellabel",
        renovationTarget: "Renovatiedoel",
        afterImprovements: "Na verbeteringen",

        projectProgress: "Projectvoortgang",
        planCompletion: "Voortgang renovatieplan",

        aiConfidenceScore: "AI-betrouwbaarheidsscore",
        highConfidence: "Hoge betrouwbaarheid",

        values: {
          defaultProjectName: "Mijn renovatieproject",
          home: "Woning",
        },

        propertyTypes: {
          detached: "Vrijstaande woning",
          semiDetached: "Twee-onder-een-kapwoning",
          terraced: "Rijtjeswoning",
          apartment: "Appartement",
        },

        status: {
          aiAnalysisCompleted: "AI-analyse voltooid",
          aiScanInProgress: "AI-woningsscan bezig",
          aiAnalysisPending: "AI-analyse in afwachting",
        },
      },

      projectDetails: {
        loading: {
          title: "Project laden...",
          description: "Je renovatieproject wordt opgehaald uit Bouwiser.",
        },
        errorTitle: "Project kan niet worden geladen",
        errors: {
          templateUnavailable: "Projectsjabloon is niet beschikbaar.",
          signInRequired: "Je moet ingelogd zijn om dit project te bekijken.",
          loadFailed: "We konden dit project niet laden.",
          photosFailed: "Projectfoto's konden niet worden geladen.",
        },
        aiReport: {
          eyebrow: "Samenvatting AI-rapport",
          title: "Renovatieanalyse",
          description:
            "De woning kan verbeteren van energielabel {{current}} naar {{target}} door de aanbevolen renovatiemaatregelen uit te voeren.",
          currentLabel: "Huidig energielabel",
          predictedLabel: "Verwacht energielabel",
          co2Reduction: "CO₂-reductie",
          aiConfidence: "AI-betrouwbaarheid",
        },
        photos: {
          eyebrow: "Projectfoto's",
          title: "Fotogalerij van de woning",
          description:
            "Foto's die tijdens de AI-woningscan zijn geüpload, worden privé opgeslagen voor dit renovatieproject.",
          count_one: "{{count}} foto",
          count_other: "{{count}} foto's",
          emptyTitle: "Nog geen projectfoto's",
          emptyDescription:
            "Foto's die tijdens de AI-woningscan worden toegevoegd, verschijnen hier nadat de voortgang van de scan is opgeslagen.",
        },
        photoCategories: {
          "Front facade": "Voorgevel",
          "Back facade": "Achtergevel",
          Roof: "Dak",
          Windows: "Ramen",
          "Heating system": "Verwarmingssysteem",
          "Meter cupboard": "Meterkast",
        },
        documents: {
          eyebrow: "Projectdocumenten",
          title: "Documenten",
          view: "Document bekijken",
          updatedDaysAgo_one: "{{count}} dag geleden bijgewerkt",
          updatedDaysAgo_other: "{{count}} dagen geleden bijgewerkt",
          files: {
            energyLabel: "Energielabelcertificaat.pdf",
            aiReport: "AI-renovatierapport.pdf",
            floorPlan: "Bestaande plattegrond.pdf",
            contractorQuote: "Offerte aannemer.pdf",
          },
        },
        quotes: {
          eyebrow: "Offertes van aannemers",
          title: "Offertes vergelijken",
          review: "Offerte bekijken",
          status: {
            recommended: "Aanbevolen",
            received: "Ontvangen",
            underReview: "Wordt beoordeeld",
          },
        },
        tasks: {
          eyebrow: "Projecttaken",
          title: "Renovatiechecklist",
          items: {
            uploadRoofPhotos: "Dakfoto's uploaden",
            reviewAiReport: "AI-renovatierapport bekijken",
            compareInsulation: "Isolatieproducten vergelijken",
            requestQuotes: "Offertes van aannemers aanvragen",
            scheduleInstallation: "Installatie plannen",
          },
        },
      },

      myProjects: {
        homeowner: "Huiseigenaar",
        authLoading: "Je Bouwiser-projecten worden geladen...",
        eyebrow: "Projectbeheer",
        title: "Mijn projecten",
        description:
          "Volg de voortgang, budgetten en energieverbeteringen van je renovaties.",
        newProject: "Nieuw project",

        stats: {
          totalProjects: "Totaal aantal projecten",
          allProjects: "Alle renovatieprojecten",
          activeProjects: "Actieve projecten",
          currentlyProgressing: "Momenteel in uitvoering",
          totalInvestment: "Totale investering",
          plannedBudget: "Gepland projectbudget",
          estimatedSavings: "Geschatte besparing",
          perYear: "Per jaar",
        },

        sectionTitle: "Renovatieprojecten",
        sectionDescription: "Bekijk en beheer al je renovatieplannen.",
        searchPlaceholder: "Zoek projecten...",
        filter: "Filter",
        projectsLoading: "Projecten worden geladen vanuit Bouwiser...",
        loadErrorTitle: "Projecten konden niet worden geladen",
        loadErrorMessage: "We konden je projecten niet laden.",

        projectOptions: "Projectopties",
        energyLabel: "Label",
        aiScore: "AI-score",
        projectProgress: "Projectvoortgang",
        budget: "Budget",
        payback: "Terugverdientijd",
        nextAction: "Volgende actie",
        openProject: "Project openen",
        startScan: "Start AI-woningscan",

        values: {
          home: "Woning",
          unknownCity: "Onbekende plaats",
          defaultProjectName: "Mijn renovatieproject",
          aiAnalysisCompleted: "AI-analyse voltooid",
          aiScanInProgress: "AI-woningscan bezig",
          continueAiScan: "Ga verder met AI-woningscan",
          toBeEstimated: "Nog te bepalen",
          reviewRecommendations: "Bekijk de AI-renovatieaanbevelingen",
        },

        propertyTypes: {
          detached: "Vrijstaande woning",
          semiDetached: "Twee-onder-een-kapwoning",
          terraced: "Rijtjeswoning",
          apartment: "Appartement",
        },

        empty: {
          noProjectsYet: "Nog geen projecten",
          noProjectsFound: "Geen projecten gevonden",
          startFirstScan:
            "Start je eerste AI-woningscan om een renovatieproject aan te maken.",
          tryDifferentSearch:
            "Probeer een andere projectnaam, plaats of woningtype.",
        },
      },

      comparePage: {
        backToProducts: "Terug naar producten",
        eyebrow: "Productvergelijking",
        titleLine1: "Vergelijk producten",
        titleLine2: "naast elkaar.",
        description:
          "Vergelijk prijzen, specificaties en winkelopties om de verschillen te begrijpen voordat je een keuze maakt.",
        loading: "Vergelijking laden...",
        loadErrorTitle: "Vergelijking kon niet worden geladen",
        loadErrorMessage: "De geselecteerde producten konden niet worden geladen.",
        noProductsSelected: "Geen producten geselecteerd",
        noProductsDescription:
          "Selecteer twee tot vier producten uit de marktplaats om prijzen en specificaties te vergelijken.",
        browseProducts: "Bekijk producten",
        selectedCount_one: "{{count}} product geselecteerd",
        selectedCount_other: "{{count}} producten geselecteerd",
        maxFour: "Je kunt maximaal vier producten vergelijken.",
        addProduct: "Product toevoegen",
        clearComparison: "Vergelijking wissen",
        selectOneMore:
          "Selecteer minimaal één extra product voor een nuttige vergelijking.",
        comparison: "Vergelijking",
        product: "Product",
        brandNotSpecified: "Merk niet opgegeven",
        removeProduct: "Product uit vergelijking verwijderen",
        bestPrice: "Beste prijs",
        lowest: "Laagste",
        per: "per",
        package: "verpakking",
        retailer: "Winkel",
        noOffer: "Geen aanbod",
        rating: "Beoordeling",
        notAvailable: "Niet beschikbaar",
        material: "Materiaal",
        notSpecified: "Niet opgegeven",
        colour: "Kleur",
        visit: "Bekijk bij",
        store: "winkel",
        noCurrentOffer: "Momenteel geen aanbod",
        aboutTitle: "Over deze vergelijking",
        aboutDescription:
          "Bouwiser vergelijkt de productinformatie die momenteel beschikbaar is in de marktplaatsdatabase. Winkelprijzen en beschikbaarheid kunnen veranderen, dus controleer de definitieve informatie op de website van de winkel voordat je een aankoop doet.",
      },

      taxonomy: {
        flooring: "Vloeren",
        "walls-ceilings": "Wanden & plafonds",
        insulation: "Isolatie",
        "windows-doors": "Ramen & deuren",
        roofing: "Dakbedekking",
        "heating-cooling": "Verwarming & koeling",
        "solar-energy": "Zonne-energie",
        bathroom: "Badkamer",
        kitchen: "Keuken",
        electrical: "Elektra",
        plumbing: "Installatiewerk",
        "construction-materials": "Bouwmaterialen",
        "interior-finishing": "Interieurafwerking",
        "exterior-garden": "Buiten & tuin",
        "tools-installation": "Gereedschap & installatie",
      },

      comparison: {
        title: "Vergelijk slimmer.",
        description:
          "Vergelijk producten, specificaties en winkelprijzen op één plek.",
        action: "Bekijk producten",
      },

      hero: {
        eyebrow: "Slimmer renoveren",
        titleLine1: "Maak betere keuzes",
        titleLine2: "voor je woning.",
        description:
          "Plan je renovatie, vergelijk bouwproducten en prijzen en ontvang persoonlijk advies — alles op één plek.",
        exploreProducts: "Bekijk producten",
        askAI: "Vraag Bouwiser AI",
        note: "Onafhankelijk advies voor slimmere renovatiekeuzes.",
        imageAlt: "Renovatie van een Nederlandse woning",
      },

      trusted: {
        aiGuidance: "AI-advies",
        energyInsights: "Energie-inzichten",
        renovationExpertise: "Renovatie-expertise",
        personalRoadmap: "Persoonlijk stappenplan",
      },

      aiSection: {
        label: "AI-woningscan",
        titleLine1: "Ontdek hoe je woning",
        titleLine2: "kan worden verbeterd.",
        description:
          "Voeg enkele foto's en basisgegevens over je woning toe. Bouwiser helpt renovatiemogelijkheden te herkennen en geeft je een persoonlijk startpunt.",
        insight1: "Inzicht in energie en prestaties",
        insight2: "Renovatieaanbevelingen",
        insight3: "Indicatieve kosten en besparingen",
        startScan: "Start AI-woningscan",
        disclaimer:
          "De resultaten zijn indicatief en bedoeld ter ondersteuning van renovatieplanning en besluitvorming.",
        previewTitle: "Voorbeeld woninganalyse",
        previewSubtitle: "Voorbeeld van Bouwiser-advies",
        example: "Voorbeeld",
        opportunity: "Renovatiemogelijkheid",
        recommendationTitle:
          "Verbeter eerst de isolatie voordat je het verwarmingssysteem vernieuwt",
        recommendationDescription:
          "Op basis van het voorbeeldprofiel van de woning kan betere dak- en muurisolatie het warmteverlies verminderen en het effect van toekomstige verwarmingsmaatregelen verbeteren.",
        energyImpact: "Energie-impact",
        high: "Hoog",
        costIndication: "Kostenindicatie",
        medium: "Gemiddeld",
        priority: "Prioriteit",
        recommended: "Aanbevolen",
      },

      productComparison: {
        label: "Productvergelijking",
        titleLine1: "Vergelijk producten.",
        titleLine2: "Vind het beste aanbod.",
        description:
          "Vergelijk renovatieproducten, technische informatie en winkelprijzen voordat je beslist wat je koopt.",
        browseAll: "Bekijk alle producten",
        searchPlaceholder: "Zoek isolatie, ramen, verwarming...",
        insulation: "Isolatie",
        windows: "Ramen",
        heating: "Verwarming",
        roofInsulation: "Dakisolatie",
        glazing: "HR++ glas",
        heatPump: "Hybride warmtepomp",
        high: "Hoog",
        veryHigh: "Zeer hoog",
        roofPrice: "Vanaf €18 / m²",
        glazingPrice: "Vanaf €140 / m²",
        heatPumpPrice: "Vanaf €4.500",
        roofDetail: "Verminder warmteverlies via het dak.",
        glazingDetail: "Verbeter de isolatie en het binnencomfort.",
        heatPumpDetail:
          "Verminder het gasverbruik met behoud van je bestaande cv-ketel.",
        popular: "Populair",
        energyUpgrade: "Energieverbetering",
        energyImpact: "Energie-impact",
        indicativePrice: "Indicatieve prijs",
        compare: "Vergelijken",
        retailerPrices: "Winkelprijzen",
        retailerTitleLine1: "Eén product.",
        retailerTitleLine2: "Verschillende prijzen.",
        retailerDescription:
          "Bekijk waar een product verkrijgbaar is en vergelijk winkelprijzen voordat je doorgaat naar de winkel.",
        exploreProducts: "Bekijk producten",
        exampleComparison: "Voorbeeldvergelijking",
        bestPrice: "Beste prijs",
        inStock: "Op voorraad",
        lowStock: "Beperkte voorraad",
        exampleNote:
          "Voorbeeldweergave. Actuele aanbiedingen worden geladen uit de productdatabase van Bouwiser.",
      },

      roadmap: {
        label: "Renovatiestappenplan",
        titleLine1: "Van eerste inzicht naar",
        titleLine2: "een duidelijk renovatieplan.",
        description:
          "Bouwiser brengt je renovatiebeslissingen samen in één gestructureerd traject: van inzicht in je woning tot het vergelijken van oplossingen en het plannen van de werkzaamheden.",
        exampleJourney: "Voorbeeld renovatietraject",
        status: {
          completed: "Voltooid",
          current: "Huidige stap",
          next: "Volgende stap",
        },
        steps: {
          homeProfile: {
            title: "Woningprofiel",
            description:
              "Voeg woninggegevens, energielabel en renovatiefoto's toe.",
          },
          aiAnalysis: {
            title: "AI-analyse",
            description:
              "Bouwiser analyseert de energieprestaties en mogelijke renovatiemaatregelen.",
          },
          recommendations: {
            title: "Aanbevelingen",
            description:
              "Ontvang geprioriteerde verbeteringen die passen bij je woning en doelen.",
          },
          costEstimate: {
            title: "Kostenraming",
            description:
              "Bekijk de verwachte investering, subsidies, besparingen en terugverdientijd.",
          },
          compareProducts: {
            title: "Producten vergelijken",
            description:
              "Vergelijk materialen, systemen, producten, installateurs en winkels.",
          },
          planRenovation: {
            title: "Renovatie plannen",
            description:
              "Maak een planning, budget en duidelijk stappenplan voor de uitvoering.",
          },
        },
        summary: {
          subsidy: "Beschikbare subsidie",
          annualSavings: "Jaarlijkse besparing",
          payback: "Geschatte terugverdientijd",
          paybackValue: "6 jaar",
        },
        completion: {
          title: "Renovatie voltooid",
          targetAchieved: "Doel bereikt",
          description:
            "Breng aanbevelingen, productkeuzes, kosten en planning samen in één afgerond renovatietraject.",
          energyLabel: "Energielabel",
          co2Reduction: "CO₂-reductie",
          annualSaving: "Jaarlijkse besparing",
        },
      },

      testimonials: {
        label: "Renovatie-inzichten",
        titleLine1: "Begrijp de impact",
        titleLine2: "voordat je gaat renoveren.",
        description:
          "Bouwiser helpt je renovatiemogelijkheden te verkennen, mogelijke resultaten te vergelijken en beter onderbouwde keuzes voor je woning te maken.",
        illustrativeExample: "Illustratief voorbeeld",
        exampleDisclaimer:
          "Alleen een voorbeeld. Werkelijke resultaten zijn afhankelijk van je woning, renovatiemaatregelen en beschikbare gegevens.",
        examples: {
          energy: {
            category: "Energieprestatie",
            title: "Verbeter de energieprestatie van je woning",
            description:
              "Ontdek hoe isolatie, beglazing en verwarmingsmaatregelen de totale energieprestatie van je woning kunnen verbeteren.",
            insight: "Verbetering energielabel",
          },
          costs: {
            category: "Kosten & besparingen",
            title: "Krijg inzicht in de financiële impact",
            description:
              "Vergelijk indicatieve investeringskosten, beschikbare subsidies en mogelijke energiebesparingen voordat je een beslissing neemt.",
            insight: "Mogelijke jaarlijkse besparing",
          },
          sustainability: {
            category: "Duurzaamheid",
            title: "Ontdek de impact van je renovatie",
            description:
              "Bekijk hoe verschillende renovatiemaatregelen het energieverbruik kunnen verminderen en de milieuprestaties van je woning kunnen verbeteren.",
            insight: "Mogelijke CO₂-reductie",
          },
        },
        capabilitiesLabel: "Wat Bouwiser je helpt beoordelen",
        capabilities: {
          energy: {
            title: "Energie-inzichten",
            text: "Ontdek waar je woning beter kan presteren.",
          },
          priorities: {
            title: "Geprioriteerde verbeteringen",
            text:
              "Bepaal welke renovatiemaatregelen je het beste eerst kunt overwegen.",
          },
          costs: {
            title: "Kostenindicaties",
            text:
              "Bekijk indicatieve kosten, besparingen en subsidiemogelijkheden.",
          },
          nextSteps: {
            title: "Duidelijke vervolgstappen",
            text: "Zet renovatie-inzichten om in een gestructureerd plan.",
          },
        },
        ctaTitle: "Klaar om je woning te verkennen?",
        ctaDescription:
          "Start met de Bouwiser AI-woningscan om mogelijke renovatiekansen te identificeren en een duidelijker startpunt voor je renovatietraject te creëren.",
        startScan: "Start AI-woningscan",
      },

      common: {
        language: "Taal",
        dutch: "Nederlands",
        english: "Engels",
      },
    },
  },

  en: {
    translation: {
      nav: {
        home: "Home",
        projects: "My Projects",
        marketplace: "Products",
        compare: "Compare",
        energy: "Energy",
        aiAssistant: "AI Assistant",
        partners: "Partners",
        about: "About",
        contact: "Contact",
        startScan: "Start AI Scan",
      },

      products: {
        browseTitle: "Browse & compare products",
        browseDescription:
          "Compare building products, prices and performance.",
        categories: {
          insulation: "Insulation",
          windows: "Windows",
          flooring: "Flooring",
          heating: "Heating",
          solar: "Solar",
          materials: "Materials",
        },
      },

      productsPage: {
        eyebrow: "Products",
        titleLine1: "Find and compare",
        titleLine2: "building products.",
        description:
          "Search renovation products, compare specifications and retailer prices, then continue to the store when you are ready.",
        searchPlaceholder: "Search products, brands or materials...",
        filters: "Filters",
        clear: "Clear",
        category: "Category",
        allCategories: "All categories",
        subcategory: "Subcategory",
        allSubcategories: "All subcategories",
        selectCategoryFirst: "Select a category first",
        retailer: "Retailer",
        allRetailers: "All retailers",
        resultCount_one: "{{count}} product",
        resultCount_other: "{{count}} products",
        resultsDescription: "Compare product information and retailer offers.",
        sort: {
          featured: "Featured",
          lowestPrice: "Lowest price",
          highestPrice: "Highest price",
          highestRating: "Highest rating",
          productName: "Product name",
        },
        loading: "Loading products...",
        loadErrorTitle: "Products could not be loaded",
        loadErrorMessage: "We could not load the product marketplace.",
        noMatchingProducts: "No matching products",
        tryChangingFilters: "Try changing your search or filters.",
        clearFilters: "Clear filters",
        buildingProduct: "Building product",
        from: "From",
        noCurrentOffer: "No current retailer offer",
        material: "Material",
        selected: "Selected",
        compare: "Compare",
        visitStore: "Visit store",
        noOffer: "No offer",
        selectedCount_one: "{{count}} product selected",
        selectedCount_other: "{{count}} products selected",
        compareProducts: "Compare products",
      },


      aiScan: {
        name: "AI Home Scan",
        saveAndExit: "Save and exit",
        loadingDraft: "Loading your saved AI Home Scan...",
        overallProgress: "Overall progress",
        stepOf: "Step {{current}} of {{total}}",
        back: "Back",
        continue: "Continue",
        localSaveNotice:
          "Your progress is saved on this device. Sign in to sync it with your Bouwiser account.",

        save: {
          unsaved: "Unsaved changes",
          saving: "Saving...",
          local: "Saved on this device",
          saved: "Progress saved",
        },

        hero: {
          badge: "Personalized AI assessment",
          title: "Analyse your home in five simple steps",
          description:
            "Tell us about your home, energy usage and renovation goals. Bouwiser will prepare a personalized improvement roadmap.",
        },

        stepLabels: {
          step1: "Step 1",
          step2: "Step 2",
          step3: "Step 3",
          step4: "Step 4",
        },

        steps: {
          property: {
            title: "Property",
            description: "Basic details",
          },
          photos: {
            title: "Photos",
            description: "Home images",
          },
          energy: {
            title: "Energy",
            description: "Usage profile",
          },
          goals: {
            title: "Goals",
            description: "Your priorities",
          },
          analysis: {
            title: "Analysis",
            description: "AI assessment",
          },
        },

        property: {
          title: "Tell us about your property",
          description:
            "Provide the basic information needed to create your home profile.",
          streetAddress: "Street address",
          city: "City",
          cityPlaceholder: "The Hague",
          postalCode: "Postal code",
          yearBuilt: "Year built",
          floorArea: "Floor area",
          propertyType: "Property type",
        },

        propertyTypes: {
          "Detached house": "Detached house",
          "Semi-detached house": "Semi-detached house",
          "Terraced house": "Terraced house",
          Apartment: "Apartment",
        },

        photos: {
          title: "Upload property photos",
          description:
            "Clear photos help Bouwiser identify renovation opportunities more accurately.",
          uploading: "Uploading...",
          uploadedReplace: "Uploaded — click to replace",
          choosePhoto: "Click to choose a photo",
          removePhoto: "Remove photo",
          privacy:
            "Photos are uploaded to your private Bouwiser project storage. Each signed-in user can access only files stored under their own account folder.",
        },

        photoCategories: {
          frontFacade: "Front facade",
          backFacade: "Back facade",
          roof: "Roof",
          windows: "Windows",
          heatingSystem: "Heating system",
          meterCupboard: "Meter cupboard",
        },

        energy: {
          title: "Add your energy information",
          description:
            "Energy usage helps Bouwiser estimate savings and improvement potential.",
          currentLabel: "Current energy label",
          selectLabel: "Select energy label",
          annualGas: "Annual gas usage",
          annualElectricity: "Annual electricity usage",
          billTitle: "Energy bill or certificate",
          billDescription:
            "You will later be able to upload an energy bill or official energy-label certificate for a more accurate analysis.",
        },

        goalsSection: {
          title: "What do you want to achieve?",
          description:
            "Select one or more renovation goals so the recommendations match your priorities.",
        },

        goals: {
          lowerBills: {
            title: "Lower energy bills",
            description: "Reduce monthly gas and electricity costs.",
          },
          comfort: {
            title: "Improve comfort",
            description: "Create a warmer and more comfortable home.",
          },
          homeValue: {
            title: "Increase home value",
            description: "Improve long-term property value.",
          },
          solar: {
            title: "Install solar panels",
            description: "Generate renewable electricity at home.",
          },
          heatPump: {
            title: "Install a heat pump",
            description: "Upgrade to efficient low-carbon heating.",
          },
          insulation: {
            title: "Improve insulation",
            description: "Reduce heat loss through roof, walls and floor.",
          },
        },

        analysis: {
          readyTitle: "Ready to start your AI analysis",
          analysingTitle: "Bouwiser is analysing your home",
          description:
            "Our AI will evaluate your property profile, energy usage, photos and renovation objectives.",
          progress: "Analysis progress",
          start: "Start AI Analysis",
        },

        analysisItems: {
          property: "Reviewing property information",
          energy: "Analysing energy performance",
          insulation: "Checking insulation opportunities",
          solar: "Estimating solar potential",
          subsidies: "Calculating available subsidies",
          recommendations: "Preparing renovation recommendations",
        },

        results: {
          complete: "Analysis complete",
          title: "Your AI renovation report is ready",
          description:
            "Bouwiser identified the most promising energy and renovation opportunities for your home.",
          confidence: "AI confidence",
          targetLabel: "Target energy label",
          annualSaving: "Annual saving",
          co2Reduction: "CO₂ reduction",
          viewDashboard: "View My Renovation Dashboard",
        },

        errors: {
          chooseImage: "Please choose an image file.",
          imageTooLarge: "Please choose an image smaller than 10 MB.",
          signInForPhotos: "Please sign in before uploading property photos.",
          uploadFailed: "The photo could not be uploaded. Please try again.",
          removeFailed: "The photo could not be removed. Please try again.",
          syncFailed:
            "Your changes are saved on this device, but they could not be synced to your account.",
        },
      },

      aiAssistant: {
        badge: "Bouwiser AI Assistant",
        title: "Renovation guidance in one conversation",
        subtitle: "Renovation guidance assistant",
        welcomeTitle: "How can I help with your renovation?",
        welcomeDescription:
          "Ask about renovation priorities, energy performance, products, sustainability and indicative costs. I can help you understand possible measures, compare options and prepare the next steps for your home.",
        suggestions: {
          first: "Which renovation should I do first?",
          energyLabel: "How can I improve my energy label?",
          compareRoof: "Compare roof insulation options",
          subsidies: "What subsidies may be relevant?",
        },
        placeholder: "Ask Bouwiser AI...",
        send: "Send message",
      },

      energy: {
        hero: {
          eyebrow: "Energy improvement",
          title: "Improve your home's energy performance.",
          description:
            "Understand how renovation measures can reduce energy use, improve comfort and support a better energy label.",
          analyse: "Analyse my home",
          note:
            "Personalised results depend on the information provided about your home.",
        },

        scenario: {
          eyebrow: "Example home scenario",
          title: "See how renovation measures can work together.",
          description:
            "This example illustrates how several improvements could contribute to better overall energy performance.",
          badge: "Illustrative example",
          current: "Current example",
          labelD: "Label D",
          currentDescription:
            "The starting point used for this example renovation journey.",
          improvements: "Example improvements",
          improvementItems: [
            "Improve roof insulation",
            "Upgrade glazing",
            "Improve the heating system",
          ],
          potential: "Potential outcome",
          labelB: "Label B",
          potentialDescription:
            "Potentially lower energy use and improved thermal comfort.",
          note:
            "Energy-label outcomes depend on the property, existing building characteristics and the measures implemented.",
        },

        renovation: {
          eyebrow: "Renovation measures",
          title: "Where can energy performance improve?",
          description:
            "Different parts of a home influence energy use and comfort. Bouwiser helps you understand which improvements may be relevant.",
        },

        impact: {
          high: "High",
          mediumHigh: "Medium–High",
        },

        impactLabel: "{{impact}} impact",

        categories: {
          insulation: "insulation",
          windows: "windows",
          heating: "heating",
        },

        measures: {
          roof: {
            title: "Roof insulation",
            description:
              "Reduce heat loss through the roof and improve indoor comfort.",
          },
          glazing: {
            title: "High-performance glazing",
            description:
              "Improve thermal comfort and reduce heat loss through windows.",
          },
          heatPump: {
            title: "Hybrid heat pump",
            description:
              "Reduce gas consumption by combining a heat pump with an existing boiler.",
          },
        },

        exploreCategory: "Explore {{category}}",

        cta: {
          eyebrow: "Your home is different.",
          title: "Find renovation opportunities for your own home.",
          description:
            "Add basic property information and let Bouwiser create a more relevant starting point for your renovation decisions.",
          button: "Start AI Home Scan",
          note:
            "Actual energy performance and possible improvements depend on the individual property and the measures implemented.",
        },
      },


      aboutPage: {
        hero: {
          eyebrow: "About Bouwiser",
          title:
            "Making home renovation decisions smarter, clearer and more sustainable",
          description:
            "Bouwiser is a digital platform designed to make residential renovation decisions easier and more transparent in the Netherlands. By bringing together renovation guidance, energy insights, product and material information, comparison tools and supplier information, Bouwiser helps homeowners understand their options and make better-informed decisions for their homes.",
        },

        pillars: {
          comparison: {
            title: "Simplify comparison",
            text:
              "Bring fragmented product, material, cost and renovation information together in one structured environment.",
          },
          decisions: {
            title: "Guide smarter decisions",
            text:
              "Combine property information, renovation goals and digital guidance to help homeowners identify relevant options.",
          },
          sustainability: {
            title: "Support sustainable renovation",
            text:
              "Make energy performance, renovation measures and sustainable material choices easier to understand and compare.",
          },
          transparency: {
            title: "Improve transparency",
            text:
              "Provide clearer information about products, specifications, suppliers, costs and performance.",
          },
        },

        vision: {
          eyebrow: "Our vision",
          title: "A smarter and more connected renovation ecosystem",
          description:
            "Bouwiser aims to create a transparent digital environment where homeowners can move from understanding their renovation needs to exploring suitable measures, comparing products and materials, and connecting with relevant suppliers and renovation professionals.",
        },
      },


      partnersPage: {
        hero: {
          eyebrow: "Supplier & partner network",
          titleLine1: "Connect renovation products",
          titleLine2: "with homeowners.",
          description:
            "Bouwiser brings manufacturers, suppliers and renovation professionals into one structured environment where homeowners can explore products, understand options and plan their next renovation steps.",
        },

        network: {
          eyebrow: "Partner network",
          title: "Built for the renovation ecosystem.",
          description:
            "Bouwiser is designed to connect the different parties involved in residential renovation through clearer information and a more structured homeowner journey.",
        },

        types: {
          manufacturers: {
            title: "Manufacturers",
            description:
              "Present building products with clear specifications, performance information and relevant renovation applications.",
          },
          suppliers: {
            title: "Suppliers",
            description:
              "Help homeowners discover available products and compare suitable options in one structured environment.",
          },
          professionals: {
            title: "Renovation professionals",
            description:
              "Connect renovation expertise with homeowners who are actively planning improvements to their properties.",
          },
        },

        value: {
          eyebrow: "Why partner with Bouwiser?",
          title:
            "A clearer route from product information to renovation decisions.",
          description:
            "Bouwiser aims to make renovation information more useful for homeowners while giving industry partners a structured way to present relevant products and expertise.",
        },

        benefits: {
          visibility: {
            title: "Product visibility",
            description:
              "Make products easier to discover within relevant renovation categories and homeowner journeys.",
          },
          comparison: {
            title: "Structured comparison",
            description:
              "Present product information in a consistent format that helps homeowners understand and compare options.",
          },
          connections: {
            title: "Relevant homeowner connections",
            description:
              "Reach homeowners at the moment they are exploring renovation measures, products and next steps.",
          },
        },

        cta: {
          eyebrow: "Join the Bouwiser network",
          title: "Interested in becoming a Bouwiser partner?",
          description:
            "Manufacturers, suppliers and renovation professionals can contact Bouwiser to discuss product visibility, collaboration and participation in the platform.",
          button: "Contact Bouwiser",
        },
      },


      contactPage: {
        hero: {
          eyebrow: "Contact Bouwiser",
          title: "Questions, feedback or partnership interest?",
          description:
            "We welcome questions and feedback from homeowners, suppliers, manufacturers and renovation professionals.",
        },

        general: {
          title: "General enquiries",
        },

        partners: {
          title: "Supplier & partner enquiries",
          description:
            "Manufacturers, suppliers and renovation professionals",
        },

        form: {
          name: "Name",
          namePlaceholder: "Your name",
          email: "Email",
          subject: "Subject",
          subjectPlaceholder: "What would you like to discuss?",
          message: "Message",
          messagePlaceholder: "Tell us how we can help...",
          button: "Contact Bouwiser",
          note:
            "Clicking the button opens your email application with your message prepared for Bouwiser.",
        },

        email: {
          defaultSubject: "Bouwiser website enquiry",
          name: "Name",
          email: "Email",
          message: "Message",
          notProvided: "Not provided",
          noMessage: "No message provided",
        },
      },


      loginModal: {
        trigger: "Login",
        close: "Close authentication window",

        login: {
          title: "Welcome back",
          description: "Sign in to manage your renovation projects.",
        },

        signup: {
          title: "Create your account",
          description:
            "Create your Bouwiser account and start your renovation journey.",
        },

        fields: {
          fullName: "Full name",
          fullNamePlaceholder: "Your full name",
          email: "Email address",
          password: "Password",
          passwordPlaceholder: "Minimum 8 characters",
        },

        togglePassword: "Show or hide password",

        actions: {
          pleaseWait: "Please wait...",
          login: "Login to Bouwiser",
          createAccount: "Create account",
        },

        switch: {
          noAccount: "No account yet?",
          haveAccount: "Already have an account?",
          createAccount: "Create account",
          login: "Login",
        },

        messages: {
          accountCreated:
            "Account created. Please check your email and confirm your account.",
          genericError: "Something went wrong. Please try again.",
        },
      },

      dashboard: {
        defaultUser: "Homeowner",
        home: "Home",
        unknownCity: "Unknown city",
        toBeEstimated: "To be estimated",
        reviewAiRecommendations: "Review AI renovation recommendations",

        loading: "Loading your Bouwiser workspace...",
        eyebrow: "Dashboard overview",
        welcomeBack: "Welcome back, {{name}}",
        description:
          "Manage renovation projects, AI reports and energy improvements.",
        newProject: "New Project",

        stats: {
          activeProjects: "Active Projects",
          totalProjects_one: "{{count}} total project",
          totalProjects_other: "{{count}} total projects",
          aiReports: "AI Reports",
          averageConfidence: "{{score}}% average confidence",
          estimatedSavings: "Estimated Savings",
          expectedAnnualSavings: "Expected annual savings",
          averageAiScore: "Average AI Score",
          acrossAllProjects: "Across all projects",
        },

        activeProjects: "Active projects",
        renovationProgress: "Renovation progress",
        monitorProjects:
          "Monitor each project and continue from its current stage.",
        viewAllProjects: "View all projects",
        estimatedBudget: "Estimated budget",
        projectProgress: "Project progress",
        openProject: "Open project",

        portfolioPerformance: "Portfolio performance",
        averageProjectProgress: "Average project progress",
        portfolioCompletion: "Portfolio completion",
        annualSavings: "Annual savings",
        co2Reduction: "CO₂ reduction",
        bestPerformingProject: "Best-performing project",
        completed: "completed",
      },

      dashboardSidebar: {
        smartPlatform: "Smart renovation platform",
        workspace: "Workspace",
        notifications: "Notifications",

        menu: {
          dashboard: "Dashboard",
          projects: "My Projects",
          myHome: "My Home",
          aiAssistant: "AI Assistant",
          products: "Products",
          contractors: "Contractors",
          reports: "Reports",
        },

        aiScore: {
          title: "AI renovation score",
          high: "High",
          confidence: "Confidence score",
          description:
            "Your renovation plan has a high-confidence AI analysis.",
          viewReport: "View AI report",
        },

        subsidies: "Subsidies",
        settings: "Settings",
        homeowner: "Homeowner",
        openProfileSettings: "Open profile settings",
        logout: "Log out",
      },











      budgetCard: {
        eyebrow: "Project budget",
        title: "Financial overview",
        description:
          "Review the planned investment, estimated subsidy, annual savings and expected payback period.",
        subsidyCoverage: "{{percentage}}% subsidy coverage",
        totalBudget: "Total budget",
        plannedInvestment: "Planned renovation investment",
        estimatedSubsidy: "Estimated subsidy",
        governmentSupport: "Potential government support",
        annualSaving: "Annual saving",
        yearlyEnergySaving: "Expected yearly energy saving",
        paybackPeriod: "Payback period",
        estimatedReturn: "Estimated return on investment",
        netInvestment: "Net investment",
        afterSubsidy: "Total budget after estimated subsidy",
        subsidyContribution: "Subsidy contribution",
        insightEyebrow: "Financial insight",
        affordability: "Renovation affordability",
        insightDescription:
          "The current renovation plan combines subsidy support and expected yearly savings to reduce the effective investment.",
        grossInvestment: "Gross investment",
        subsidyReduction: "Subsidy reduction",
        values: {
          toBeEstimated: "To be estimated",
        },
      },

      activityFeed: {
        eyebrow: "Recent activity",
        title: "Latest project updates",
        description:
          "Review recent AI analysis, uploaded documents, quotations and completed tasks.",
        viewAll: "View all activity",
        types: {
          ai: "AI",
          document: "Document",
          quote: "Quote",
          task: "Task",
        },
        items: {
          aiCompleted: {
            title: "AI analysis completed",
            description:
              "AI renovation analysis has been completed for this property.",
          },
          documentUploaded: {
            title: "Document uploaded",
            description: "A new project document has been added.",
          },
          quoteReceived: {
            title: "Quotation received",
            description: "A new contractor quotation is ready for review.",
          },
          taskCompleted: {
            title: "Task completed",
            description: "A renovation task has been marked as completed.",
          },
        },
      },

      timeline: {
        eyebrow: "Project timeline",
        title: "Renovation journey",
        description:
          "Follow every stage from property analysis to final installation.",
        status: {
          completed: "Completed",
          current: "Current",
          upcoming: "Upcoming",
        },
        items: {
          propertyAnalysis: {
            title: "Property analysis",
            description: "Property details and energy performance analysed.",
          },
          aiPlan: {
            title: "AI renovation plan",
            description:
              "Recommended renovation measures generated based on the home profile.",
          },
          productSelection: {
            title: "Product selection",
            description:
              "Compare suitable products and retailer offers.",
          },
          installation: {
            title: "Installation",
            description:
              "Plan and complete the selected renovation measures.",
          },
        },
      },

      aiRecommendations: {
        eyebrow: "AI recommendations",
        title: "Best upgrades for this home",
        description:
          "Recommendations are ranked using estimated investment, annual energy savings and expected payback period.",
        viewFullReport: "View full AI report",
        priorityLabel: "{{priority}} priority",
        cost: "Cost",
        saving: "Saving",
        payback: "Payback",
        viewProducts: "View recommended products",
        priority: {
          high: "High",
          medium: "Medium",
          low: "Low",
        },
        status: {
          completed: "Completed",
          planned: "Planned",
          recommended: "Recommended",
        },
        categories: {
          insulation: "Insulation",
          windows: "Windows",
          heating: "Heating",
          solar: "Solar",
        },
        items: {
          roofInsulation: "Roof insulation",
          tripleGlazing: "Triple glazing",
          hybridHeatPump: "Hybrid heat pump",
          solarPanels: "Solar panels",
        },
      },

      energyCard: {
        eyebrow: "AI Energy Analysis",
        title: "Energy Performance",
        description:
          "AI predicts significant improvements after implementing the recommended renovation plan.",
        current: "Current",
        predicted: "Predicted",
        renovationProgress: "Renovation Progress",
        co2Reduction: "CO₂ Reduction",
        aiConfidence: "AI Confidence",
      },

      projectSummary: {
        eyebrow: "Project overview",
        title: "Home renovation summary",
        description:
          "Review the property details, renovation target and next recommended action.",
        propertyType: "Property type",
        constructionYear: "Construction year",
        floorArea: "Floor area",
        location: "Location",
        nextBestAction: "Next best action",
        recommendationDescription:
          "This recommendation is based on the expected energy impact, investment level and estimated payback period.",
        reviewRecommendation: "Review recommendation",
        renovationTarget: "Renovation target",
        improveEnergyPerformance: "Improve energy performance",
        current: "Current",
        target: "Target",
        projectProgress: "Project progress",
        values: {
          home: "Home",
        },
        propertyTypes: {
          detached: "Detached house",
          semiDetached: "Semi-detached house",
          terraced: "Terraced house",
          apartment: "Apartment",
        },
        status: {
          aiAnalysisCompleted: "AI analysis completed",
          aiScanInProgress: "AI Home Scan in progress",
          aiAnalysisPending: "AI analysis pending",
        },
        nextActions: {
          reviewRecommendations: "Review AI renovation recommendations",
          continueAiScan: "Continue AI Home Scan",
        },
      },

      projectKpis: {
        overview: "Overview",
        estimatedBudget: "Estimated Budget",
        totalPlannedInvestment: "Total planned investment",
        availableSubsidy: "Available Subsidy",
        estimatedEligibleSupport: "Estimated eligible support",
        annualSaving: "Annual Saving",
        expectedYearlyEnergySaving: "Expected yearly energy saving",
        returnOnInvestment: "Return on Investment",
        estimatedPaybackPeriod: "Estimated payback period",
      },

      projectTabs: {
        overview: "Overview",
        aiReport: "AI Report",
        photos: "Photos",
        documents: "Documents",
        quotes: "Quotes",
        tasks: "Tasks",
        budget: "Budget",
      },

      projectHeader: {
        backToProjects: "Back to projects",
        share: "Share",
        moreActions: "More project actions",
        built: "Built {{year}}",

        currentLabel: "Current label",
        currentPerformance: "Current performance",
        beforeImprovements: "Before improvements",

        targetLabel: "Target label",
        renovationTarget: "Renovation target",
        afterImprovements: "After improvements",

        projectProgress: "Project progress",
        planCompletion: "Renovation plan completion",

        aiConfidenceScore: "AI confidence score",
        highConfidence: "High confidence",

        values: {
          defaultProjectName: "My Renovation Project",
          home: "Home",
        },

        propertyTypes: {
          detached: "Detached house",
          semiDetached: "Semi-detached house",
          terraced: "Terraced house",
          apartment: "Apartment",
        },

        status: {
          aiAnalysisCompleted: "AI analysis completed",
          aiScanInProgress: "AI Home Scan in progress",
          aiAnalysisPending: "AI analysis pending",
        },
      },

      projectDetails: {
        loading: {
          title: "Loading project...",
          description: "Retrieving your renovation project from Bouwiser.",
        },
        errorTitle: "Unable to load project",
        errors: {
          templateUnavailable: "Project template is unavailable.",
          signInRequired: "You must be signed in to view this project.",
          loadFailed: "We could not load this project.",
          photosFailed: "Project photos could not be loaded.",
        },
        aiReport: {
          eyebrow: "AI report summary",
          title: "Renovation analysis",
          description:
            "The property can improve from energy label {{current}} to {{target}} by completing the recommended renovation measures.",
          currentLabel: "Current energy label",
          predictedLabel: "Predicted energy label",
          co2Reduction: "CO₂ reduction",
          aiConfidence: "AI confidence",
        },
        photos: {
          eyebrow: "Project photos",
          title: "Property photo gallery",
          description:
            "Photos uploaded during the AI Home Scan are stored privately for this renovation project.",
          count_one: "{{count}} photo",
          count_other: "{{count}} photos",
          emptyTitle: "No project photos yet",
          emptyDescription:
            "Photos added during the AI Home Scan will appear here after the scan progress is saved.",
        },
        photoCategories: {
          "Front facade": "Front facade",
          "Back facade": "Back facade",
          Roof: "Roof",
          Windows: "Windows",
          "Heating system": "Heating system",
          "Meter cupboard": "Meter cupboard",
        },
        documents: {
          eyebrow: "Project documents",
          title: "Document workspace",
          view: "View document",
          updatedDaysAgo_one: "Updated {{count}} day ago",
          updatedDaysAgo_other: "Updated {{count}} days ago",
          files: {
            energyLabel: "Energy Label Certificate.pdf",
            aiReport: "AI Renovation Report.pdf",
            floorPlan: "Existing Floor Plan.pdf",
            contractorQuote: "Contractor Quotation.pdf",
          },
        },
        quotes: {
          eyebrow: "Contractor quotes",
          title: "Compare quotations",
          review: "Review quote",
          status: {
            recommended: "Recommended",
            received: "Received",
            underReview: "Under review",
          },
        },
        tasks: {
          eyebrow: "Project tasks",
          title: "Renovation checklist",
          items: {
            uploadRoofPhotos: "Upload roof photos",
            reviewAiReport: "Review AI renovation report",
            compareInsulation: "Compare insulation products",
            requestQuotes: "Request contractor quotations",
            scheduleInstallation: "Schedule installation",
          },
        },
      },

      myProjects: {
        homeowner: "Homeowner",
        authLoading: "Loading your Bouwiser projects...",
        eyebrow: "Project management",
        title: "My Projects",
        description:
          "Track renovation progress, budgets and energy improvements.",
        newProject: "New Project",

        stats: {
          totalProjects: "Total projects",
          allProjects: "All renovation projects",
          activeProjects: "Active projects",
          currentlyProgressing: "Currently progressing",
          totalInvestment: "Total investment",
          plannedBudget: "Planned project budget",
          estimatedSavings: "Estimated savings",
          perYear: "Per year",
        },

        sectionTitle: "Renovation projects",
        sectionDescription: "View and manage all renovation plans.",
        searchPlaceholder: "Search projects...",
        filter: "Filter",
        projectsLoading: "Loading projects from Bouwiser...",
        loadErrorTitle: "Could not load projects",
        loadErrorMessage: "We could not load your projects.",

        projectOptions: "Project options",
        energyLabel: "Label",
        aiScore: "AI Score",
        projectProgress: "Project progress",
        budget: "Budget",
        payback: "Payback",
        nextAction: "Next action",
        openProject: "Open Project",
        startScan: "Start AI Home Scan",

        values: {
          home: "Home",
          unknownCity: "Unknown city",
          defaultProjectName: "My Renovation Project",
          aiAnalysisCompleted: "AI analysis completed",
          aiScanInProgress: "AI Home Scan in progress",
          continueAiScan: "Continue AI Home Scan",
          toBeEstimated: "To be estimated",
          reviewRecommendations: "Review AI renovation recommendations",
        },

        propertyTypes: {
          detached: "Detached house",
          semiDetached: "Semi-detached house",
          terraced: "Terraced house",
          apartment: "Apartment",
        },

        empty: {
          noProjectsYet: "No projects yet",
          noProjectsFound: "No projects found",
          startFirstScan:
            "Start your first AI Home Scan to create a renovation project.",
          tryDifferentSearch:
            "Try a different project name, city or property type.",
        },
      },

      comparePage: {
        backToProducts: "Back to products",
        eyebrow: "Product comparison",
        titleLine1: "Compare products",
        titleLine2: "side by side.",
        description:
          "Compare prices, specifications and retailer options to understand the differences before you choose.",
        loading: "Loading comparison...",
        loadErrorTitle: "Comparison could not be loaded",
        loadErrorMessage: "We could not load the selected products.",
        noProductsSelected: "No products selected",
        noProductsDescription:
          "Select two to four products from the marketplace to compare their prices and specifications.",
        browseProducts: "Browse products",
        selectedCount_one: "{{count}} product selected",
        selectedCount_other: "{{count}} products selected",
        maxFour: "You can compare up to four products.",
        addProduct: "Add product",
        clearComparison: "Clear comparison",
        selectOneMore:
          "Select at least one more product to make a useful comparison.",
        comparison: "Comparison",
        product: "Product",
        brandNotSpecified: "Brand not specified",
        removeProduct: "Remove product from comparison",
        bestPrice: "Best price",
        lowest: "Lowest",
        per: "per",
        package: "package",
        retailer: "Retailer",
        noOffer: "No offer",
        rating: "Rating",
        notAvailable: "Not available",
        material: "Material",
        notSpecified: "Not specified",
        colour: "Colour",
        visit: "Visit",
        store: "store",
        noCurrentOffer: "No current offer",
        aboutTitle: "About this comparison",
        aboutDescription:
          "Bouwiser compares the product information currently available in the marketplace database. Retail prices and availability can change, so confirm the final information on the retailer website before purchasing.",
      },

      taxonomy: {
        flooring: "Flooring",
        "walls-ceilings": "Walls & ceilings",
        insulation: "Insulation",
        "windows-doors": "Windows & doors",
        roofing: "Roofing",
        "heating-cooling": "Heating & cooling",
        "solar-energy": "Solar energy",
        bathroom: "Bathroom",
        kitchen: "Kitchen",
        electrical: "Electrical",
        plumbing: "Plumbing",
        "construction-materials": "Construction materials",
        "interior-finishing": "Interior finishing",
        "exterior-garden": "Exterior & garden",
        "tools-installation": "Tools & installation",
      },

      comparison: {
        title: "Compare smarter.",
        description:
          "Compare products, specifications and retailer prices in one place.",
        action: "Explore products",
      },

      hero: {
        eyebrow: "Smarter home renovation",
        titleLine1: "Make better decisions",
        titleLine2: "for your home.",
        description:
          "Plan your renovation, compare building products and prices, and get personalised guidance — all in one place.",
        exploreProducts: "Explore products",
        askAI: "Ask Bouwiser AI",
        note: "Independent guidance for smarter renovation choices.",
        imageAlt: "Dutch home renovation",
      },

      trusted: {
        aiGuidance: "AI guidance",
        energyInsights: "Energy insights",
        renovationExpertise: "Renovation expertise",
        personalRoadmap: "Personal roadmap",
      },

      aiSection: {
        label: "AI Home Scan",
        titleLine1: "See what your home",
        titleLine2: "could improve.",
        description:
          "Add a few photos and basic information about your home. Bouwiser helps identify renovation opportunities and gives you a personalised starting point.",
        insight1: "Energy and performance insights",
        insight2: "Renovation recommendations",
        insight3: "Indicative costs and savings",
        startScan: "Start AI Home Scan",
        disclaimer:
          "Results are indicative and intended to support renovation planning and decision-making.",
        previewTitle: "Home analysis preview",
        previewSubtitle: "Example Bouwiser guidance",
        example: "Example",
        opportunity: "Renovation opportunity",
        recommendationTitle:
          "Improve insulation before upgrading the heating system",
        recommendationDescription:
          "Based on the example home profile, improving roof and wall insulation could reduce heat loss and improve the impact of future heating upgrades.",
        energyImpact: "Energy impact",
        high: "High",
        costIndication: "Cost indication",
        medium: "Medium",
        priority: "Priority",
        recommended: "Recommended",
      },

      productComparison: {
        label: "Product comparison",
        titleLine1: "Compare products.",
        titleLine2: "Find the best offer.",
        description:
          "Compare renovation products, technical information and retailer prices before you decide what to buy.",
        browseAll: "Browse all products",
        searchPlaceholder: "Search insulation, windows, heating...",
        insulation: "Insulation",
        windows: "Windows",
        heating: "Heating",
        roofInsulation: "Roof insulation",
        glazing: "HR++ glazing",
        heatPump: "Hybrid heat pump",
        high: "High",
        veryHigh: "Very high",
        roofPrice: "From €18 / m²",
        glazingPrice: "From €140 / m²",
        heatPumpPrice: "From €4,500",
        roofDetail: "Reduce heat loss through the roof.",
        glazingDetail: "Improve insulation and indoor comfort.",
        heatPumpDetail: "Reduce gas use with your existing boiler.",
        popular: "Popular",
        energyUpgrade: "Energy upgrade",
        energyImpact: "Energy impact",
        indicativePrice: "Indicative price",
        compare: "Compare",
        retailerPrices: "Retailer prices",
        retailerTitleLine1: "One product.",
        retailerTitleLine2: "Different prices.",
        retailerDescription:
          "See where a product is available and compare retailer prices before continuing to the store.",
        exploreProducts: "Explore products",
        exampleComparison: "Example comparison",
        bestPrice: "Best price",
        inStock: "In stock",
        lowStock: "Low stock",
        exampleNote:
          "Example view. Live offers are loaded from the Bouwiser product database.",
      },

      roadmap: {
        label: "Renovation roadmap",
        titleLine1: "From first insight to",
        titleLine2: "a clear renovation plan.",
        description:
          "Bouwiser brings your renovation decisions into one structured journey, from understanding your home to comparing solutions and planning the work.",
        exampleJourney: "Example renovation journey",
        status: {
          completed: "Completed",
          current: "Current",
          next: "Next",
        },
        steps: {
          homeProfile: {
            title: "Home Profile",
            description:
              "Add your property details, energy label and renovation photos.",
          },
          aiAnalysis: {
            title: "AI Analysis",
            description:
              "Bouwiser analyses energy performance and renovation opportunities.",
          },
          recommendations: {
            title: "Recommendations",
            description:
              "Receive prioritised improvements matched to your property and goals.",
          },
          costEstimate: {
            title: "Cost Estimate",
            description:
              "Review expected investment, subsidies, savings and payback period.",
          },
          compareProducts: {
            title: "Compare Products",
            description:
              "Compare materials, systems, products, installers and stores.",
          },
          planRenovation: {
            title: "Plan Renovation",
            description:
              "Create your implementation schedule, budget and renovation roadmap.",
          },
        },
        summary: {
          subsidy: "Available subsidy",
          annualSavings: "Annual savings",
          payback: "Estimated payback",
          paybackValue: "6 years",
        },
        completion: {
          title: "Renovation complete",
          targetAchieved: "Target achieved",
          description:
            "Bring recommendations, product choices, costs and planning together in one completed renovation journey.",
          energyLabel: "Energy label",
          co2Reduction: "CO₂ reduction",
          annualSaving: "Annual saving",
        },
      },

      testimonials: {
        label: "Renovation insights",
        titleLine1: "Understand the impact",
        titleLine2: "before you renovate.",
        description:
          "Bouwiser helps you explore renovation opportunities, compare potential outcomes and make more informed decisions for your home.",
        illustrativeExample: "Illustrative example",
        exampleDisclaimer:
          "Example only. Actual results depend on your property, renovation measures and available data.",
        examples: {
          energy: {
            category: "Energy performance",
            title: "Improve the energy performance of your home",
            description:
              "Explore how insulation, glazing and heating upgrades could improve your home's overall energy performance.",
            insight: "Energy label improvement",
          },
          costs: {
            category: "Costs & savings",
            title: "Understand the financial impact",
            description:
              "Compare indicative investment costs, available subsidies and potential energy savings before making a decision.",
            insight: "Potential yearly saving",
          },
          sustainability: {
            category: "Sustainability",
            title: "Explore your renovation impact",
            description:
              "See how different renovation measures could reduce energy use and improve the environmental performance of your home.",
            insight: "Potential CO₂ reduction",
          },
        },
        capabilitiesLabel: "What Bouwiser helps you evaluate",
        capabilities: {
          energy: {
            title: "Energy insights",
            text: "Understand where your home could perform better.",
          },
          priorities: {
            title: "Prioritised improvements",
            text: "Identify renovation measures worth considering first.",
          },
          costs: {
            title: "Cost indications",
            text: "Review indicative costs, savings and subsidy opportunities.",
          },
          nextSteps: {
            title: "Clear next steps",
            text: "Turn renovation insights into a structured plan.",
          },
        },
        ctaTitle: "Ready to explore your home?",
        ctaDescription:
          "Start with the Bouwiser AI Home Scan to identify potential renovation opportunities and create a clearer starting point for your renovation journey.",
        startScan: "Start AI Home Scan",
      },

      common: {
        language: "Language",
        dutch: "Dutch",
        english: "English",
      },
    },
  },
};

const savedLanguage = localStorage.getItem("bouwiser_language");

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage === "en" ? "en" : "nl",
  fallbackLng: "nl",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
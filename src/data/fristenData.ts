export interface PapierStaffel {
  geburtsjahr: string;
  frist: string;
  fristDate: string; // ISO format for countdown
  status: 'abgelaufen' | 'aktuell' | 'zukunft';
  hinweis: string;
}

export interface ScheckkartenStaffel {
  ausstellungsjahr: string;
  frist: string;
  fristDate: string;
  status: 'abgelaufen' | 'aktuell' | 'zukunft';
  hinweis: string;
}

// Dynamische Ermittlung des Frist-Status basierend auf dem aktuellen Datum
export function calculateStaffelStatus(fristDateStr: string, allFristDates: string[]): 'abgelaufen' | 'aktuell' | 'zukunft' {
  const now = new Date();
  // Reset time to start of day for clean date comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const frist = new Date(fristDateStr);

  if (today > frist) {
    return 'abgelaufen';
  }

  // Find the earliest upcoming deadline
  const upcomingDates = allFristDates
    .map(d => new Date(d))
    .filter(d => d >= today)
    .sort((a, b) => a.getTime() - b.getTime());

  if (upcomingDates.length > 0 && frist.getTime() === upcomingDates[0].getTime()) {
    return 'aktuell';
  }

  return 'zukunft';
}

const RAW_PAPIER_STAFFELN: Omit<PapierStaffel, 'status'>[] = [
  {
    geburtsjahr: 'Vor 1953',
    frist: '19. Januar 2033',
    fristDate: '2033-01-19',
    hinweis: 'Sonderregelung nach Anlage 8e FeV: Senioren mit Geburtsjahr vor 1953 haben die längste Frist bis 2033.'
  },
  {
    geburtsjahr: '1953 – 1958',
    frist: '19. Juli 2022',
    fristDate: '2022-07-19',
    hinweis: 'Frist ist bereits abgelaufen. Bei Fahrten droht ein Verwarngeld von 10 €.'
  },
  {
    geburtsjahr: '1959 – 1964',
    frist: '19. Januar 2023',
    fristDate: '2023-01-19',
    hinweis: 'Frist ist bereits abgelaufen. Der Umtausch sollte zeitnah bei der Fahrerlaubnisbehörde nachgeholt werden.'
  },
  {
    geburtsjahr: '1965 – 1970',
    frist: '19. Januar 2024',
    fristDate: '2024-01-19',
    hinweis: 'Frist ist bereits abgelaufen. Das Dokument selbst ist ungültig (Fahrerlaubnis bleibt bestehen).'
  },
  {
    geburtsjahr: '1971 oder später',
    frist: '19. Januar 2025',
    fristDate: '2025-01-19',
    hinweis: 'Frist endete im Januar 2025. Bitte schnellstmöglich umtauschen!'
  }
];

const RAW_SCHECKKARTEN_STAFFELN: Omit<ScheckkartenStaffel, 'status'>[] = [
  {
    ausstellungsjahr: '1999 – 2001',
    frist: '19. Januar 2026',
    fristDate: '2026-01-19',
    hinweis: 'Frist ist am 19. Januar 2026 abgelaufen. Bitte umgehend Termin zur Neuausstellung vereinbaren.'
  },
  {
    ausstellungsjahr: '2002 – 2004',
    frist: '19. Januar 2027',
    fristDate: '2027-01-19',
    hinweis: 'Nächste reguläre Umtauschstaffel! Jetzt frühzeitig Termin bei der Fahrerlaubnisbehörde buchen.'
  },
  {
    ausstellungsjahr: '2005 – 2007',
    frist: '19. Januar 2028',
    fristDate: '2028-01-19',
    hinweis: 'Umtauschfrist läuft bis Januar 2028.'
  },
  {
    ausstellungsjahr: '2008',
    frist: '19. Januar 2029',
    fristDate: '2029-01-19',
    hinweis: 'Reguläre Umtauschstaffel bis Januar 2029.'
  },
  {
    ausstellungsjahr: '2009',
    frist: '19. Januar 2030',
    fristDate: '2030-01-19',
    hinweis: 'Reguläre Umtauschstaffel bis Januar 2030.'
  },
  {
    ausstellungsjahr: '2010',
    frist: '19. Januar 2031',
    fristDate: '2031-01-19',
    hinweis: 'Reguläre Umtauschstaffel bis Januar 2031.'
  },
  {
    ausstellungsjahr: '2011',
    frist: '19. Januar 2032',
    fristDate: '2032-01-19',
    hinweis: 'Reguläre Umtauschstaffel bis Januar 2032.'
  },
  {
    ausstellungsjahr: '2012 – 18.01.2013',
    frist: '19. Januar 2033',
    fristDate: '2033-01-19',
    hinweis: 'Letzte Staffel des bundesweiten Stufenplans (Anlage 8e FeV).'
  }
];

// Helper to get dynamically status-evaluated staffeln
export function getPapierStaffeln(): PapierStaffel[] {
  const dates = RAW_PAPIER_STAFFELN.map(s => s.fristDate);
  return RAW_PAPIER_STAFFELN.map(s => ({
    ...s,
    status: calculateStaffelStatus(s.fristDate, dates)
  }));
}

export function getScheckkartenStaffeln(): ScheckkartenStaffel[] {
  const dates = RAW_SCHECKKARTEN_STAFFELN.map(s => s.fristDate);
  return RAW_SCHECKKARTEN_STAFFELN.map(s => ({
    ...s,
    status: calculateStaffelStatus(s.fristDate, dates)
  }));
}

export const PAPIER_STAFFELN: PapierStaffel[] = getPapierStaffeln();
export const SCHECKKARTEN_STAFFELN: ScheckkartenStaffel[] = getScheckkartenStaffeln();

export const FAQS = [
  {
    question: "Wann muss ich meinen Führerschein umtauschen?",
    answer: "Die Frist hängt von der Art Ihres Führerscheins ab: Bei Papierführerscheinen (grau oder rosa, ausgestellt bis 31.12.1998) entscheidet Ihr Geburtsjahr. Bei Plastik-Scheckkarten (ausgestellt vom 01.01.1999 bis 18.01.2013) richtet sich die Frist nach dem Ausstellungsjahr auf der Vorderseite des Führerscheins (Feld 4a)."
  },
  {
    question: "Was droht, wenn ich die Umtauschfrist verpasse?",
    answer: "Wenn Sie die Frist versäumen und weiter mit dem alten Führerschein fahren, begehen Sie eine Ordnungswidrigkeit. Bei einer Polizeikontrolle wird in der Regel ein Verwarnungsgeld von 10 Euro fällig. Wichtig: Es handelt sich NICHT um ein Fahren ohne Fahrerlaubnis (§ 21 StVG) bei den normalen Klassen B und A – die Fahrerlaubnis selbst bleibt gültig. Allerdings kann es bei Mietwagenfirmen oder im Ausland zu Reisekomplikationen und Strafen kommen."
  },
  {
    question: "Muss ich erneut Fahrstunden oder eine ärztliche Untersuchung machen?",
    answer: "Nein. Für reguläre PKW- und Motorrad-Fahrer (Klasse B, A bzw. alte Klasse 3) gilt voller Besitzstandsschutz. Es sind weder Prüfungen noch ärztliche Sehtests oder Gutachten vorgeschrieben. Der Umtausch ist ein reiner Verwaltungsakt zur Aktualisierung des Dokuments und Erhöhung des Fälschungsschutzes."
  },
  {
    question: "Was ist eine Karteikartenabschrift und wann benötige ich sie?",
    answer: "Eine Karteikartenabschrift ist eine Bestätigung aus dem Fahrerlaubnisregister derjenigen Behörde, die Ihren Führerschein einst ausgestellt hat. Sie benötigen diese nur dann, wenn Sie Ihren alten Papierführerschein bei einer anderen Führerscheinstelle umtauschen möchten, als derjenigen, die ihn ursprünglich ausgehändigt hat. Sie kann meist formlos, telefonisch oder online bei der damaligen Ausstellungsbehörde beantragt werden und ist in der Regel gebührenfrei."
  },
  {
    question: "Was kostet der Führerschein-Umtausch insgesamt?",
    answer: "Die behördliche Gebühr nach der Gebührenordnung für Maßnahmen im Straßenverkehr (GebOSt) beträgt bundesweit ca. 25,30 € bis 30,00 €. Hinzu kommen die Kosten für ein aktuelles biometrisches Lichtbild (ca. 8 € bis 15 €) sowie auf Wunsch optionale Gebühren für den Direktversand nach Hause (~5 €) oder eine Express-Bestellung bei der Bundesdruckerei (~15 € bis 35 €)."
  },
  {
    question: "Darf ich meinen alten Führerschein behalten?",
    answer: "Ja! Auf ausdrücklichen Wunsch entwertet die Führerscheinstelle das alte Dokument (z. B. durch Ausstanzen oder Eckenschnitt) und händigt es Ihnen als Erinnerungsstück wieder aus. Sie müssen Ihren alten Führerschein also nicht unwiederbringlich abgeben."
  },
  {
    question: "Wie lange ist der neue EU-Kartenführerschein gültig?",
    answer: "Der neue Führerschein ist auf 15 Jahre befristet. Nach Ablauf dieser 15 Jahre muss lediglich die Plastikkarte mit einem neuen biometrischen Passfoto erneuert werden – eine erneute Prüfung oder medizinische Begutachtung ist auch dann für PKW-Fahrer nicht erforderlich."
  },
  {
    question: "Welche Unterlagen muss ich zum Termin mitbringen?",
    answer: "Sie benötigen: 1. Ihren gültigen Personalausweis oder Reisepass (mit aktueller Meldebescheinigung), 2. Ihren bisherigen Original-Führerschein, 3. Ein aktuelles biometrisches Passfoto (35 x 45 mm, Frontalaufnahme) und 4. Ggf. die vorab angeforderte Karteikartenabschrift, falls der Ausstellungsort von Ihrem heutigen Wohnort abweicht."
  },
  {
    question: "Wo kann ich meinen Führerschein umtauschen?",
    answer: "Zuständig für den Umtausch ist die Fahrerlaubnisbehörde (Führerscheinstelle) oder das Bürgeramt Ihres aktuellen Hauptwohnsitzes. Dies gilt unabhängig davon, wo Sie Ihre Führerscheinprüfung damals abgelegt oder wo Sie den ursprünglichen Führerschein erhalten haben."
  },
  {
    question: "Kann ich den Führerschein online umtauschen?",
    answer: "In vielen Städten und Landkreisen in Deutschland wird mittlerweile ein digitaler Führerschein-Umtausch über das behördliche Serviceportal angeboten (oft unter Nutzung der Online-Ausweisfunktion des Personalausweises / eID). Prüfen Sie vorab die Website Ihrer lokalen Fahrerlaubnisbehörde."
  }
];

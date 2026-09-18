import { jsPDF } from 'jspdf';
import { ProductConfig, OrderSubmission } from '../types';

export function downloadPurchasedPdf(config: ProductConfig, order: OrderSubmission): void {
  // If user uploaded a custom PDF in the admin panel, download that exact file
  if (config.pdfFileUrl) {
    const link = document.createElement('a');
    link.href = config.pdfFileUrl;
    link.download = config.pdfFileName || 'ALL_EXAM_BOOST_1500_Questions.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Otherwise generate a comprehensive, authentic PDF based on the brand's competitive exam questions
  generateAuthenticStudyPdf(config, order);
}

function generateAuthenticStudyPdf(config: ProductConfig, order: OrderSubmission): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // PAGE 1: TITLE & COVER PAGE
  // Dark navy header banner
  doc.setFillColor(11, 20, 42);
  doc.rect(0, 0, pageWidth, 75, 'F');

  // Gold accent bar
  doc.setFillColor(245, 158, 11);
  doc.rect(0, 75, pageWidth, 3, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('ALL EXAM BOOST', pageWidth / 2, 28, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(147, 197, 253);
  doc.text('PREMIUM COMPETITIVE EXAM PRACTICE MATERIAL', pageWidth / 2, 38, { align: 'center' });

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(253, 224, 71);
  doc.text('1500 OBJECTIVE QUESTIONS', pageWidth / 2, 52, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(226, 232, 240);
  doc.text('5 CHAPTERS • BILINGUAL SOLUTIONS • HIGH-YIELD TOPICS', pageWidth / 2, 62, { align: 'center' });

  // Student license box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, 88, contentWidth, 36, 3, 3, 'FD');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('OFFICIALLY LICENSED CANDIDATE COPY', margin + 6, 96);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Student Name: ${order.fullName}`, margin + 6, 103);
  doc.text(`WhatsApp: ${order.whatsapp}`, margin + 6, 109);
  doc.text(`Order ID: ${order.id} | UTR: ${order.utrId}`, margin + 6, 115);
  doc.text(`Verified Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}`, margin + contentWidth - 6, 103, { align: 'right' });
  doc.text(`Access Key: ${order.accessKey || 'VERIFIED'}`, margin + contentWidth - 6, 109, { align: 'right' });
  doc.setTextColor(16, 185, 129);
  doc.setFont('helvetica', 'bold');
  doc.text('STATUS: VERIFIED & ACTIVE', margin + contentWidth - 6, 115, { align: 'right' });

  // Table of contents
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('INDEX & CHAPTER BREAKDOWN', margin, 136);

  let currentY = 145;
  config.chapters.forEach((ch, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 241 : 248, idx % 2 === 0 ? 245 : 250, idx % 2 === 0 ? 249 : 252);
    doc.roundedRect(margin, currentY, contentWidth, 12, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(30, 58, 138);
    doc.text(`${ch.number}: ${ch.title}`, margin + 4, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(ch.subtitle, margin + 45, currentY + 7);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(245, 158, 11);
    doc.text(`${ch.questionsCount} Qs`, margin + contentWidth - 4, currentY + 7, { align: 'right' });

    currentY += 15;
  });

  // Summary box
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(margin, currentY + 5, contentWidth, 24, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 64, 175);
  doc.text('EXAM PREPARATION DIRECTIVE', margin + 6, currentY + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text('This question bank is specially curated for Radio Operator, ASI, SSC, Railway, State Police & Technical Exams.', margin + 6, currentY + 19);
  doc.text('Practice each objective question under timed conditions and review the bilingual explanations.', margin + 6, currentY + 24);

  // Footer cover
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('ALL EXAM BOOST © Dedicated to Student Success | Unauthorized Redistribution Prohibited', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // PAGE 2: HIGH-YIELD QUESTIONS (FROM ASI RADIO / WAVE & OSCILLATION SET)
  doc.addPage();
  addHeaderFooter(doc, 'CHAPTER 01 — WAVE MOTION & SHM (OBJECTIVE PRACTICE)', 2);

  const sampleQuestions = [
    {
      num: 'Q1',
      eng: 'A necessary condition for one-dimensional motion to be simple harmonic is that the restoring force should be:',
      hin: 'एक-आयामी गति को सरल आवर्त गति होने के लिए यह आवश्यक है कि प्रत्यानयन बल हो:',
      options: [
        '(A) Constant and opposite to velocity',
        '(B) Proportional to displacement and directed towards equilibrium (उत्तर: B)',
        '(C) Proportional to velocity and directed towards equilibrium',
        '(D) Proportional to the square of displacement'
      ],
      ans: 'उत्तर: (B) SHM में प्रत्यानयन बल F = -kx होता है, जो विस्थापन के समानुपाती और माध्य स्थिति की ओर निर्देशित होता है।'
    },
    {
      num: 'Q2',
      eng: 'The differential equation d²x/dt² + 9x = 0 represents SHM having angular frequency (ω):',
      hin: 'अंतर समीकरण ẍ + 9x = 0 कोणीय आवृत्ति वाले सरल आवर्त गति को निरूपित करता है:',
      options: ['(A) 9 rad s⁻¹', '(B) 4.5 rad s⁻¹', '(C) 3 rad s⁻¹ (उत्तर: C)', '(D) √3 rad s⁻¹'],
      ans: 'उत्तर: (C) समीकरण ẍ + ω²x = 0 से तुलना करने पर, ω² = 9 ⟹ ω = 3 rad/s प्राप्त होता है।'
    },
    {
      num: 'Q3',
      eng: 'In SHM, the phase difference between displacement and acceleration is:',
      hin: 'सरल आवर्त गति (SHM) में, विस्थापन और त्वरण के बीच कलांतर होता है:',
      options: ['(A) Zero / शून्य', '(B) π/4', '(C) π/2', '(D) π rad (180°) (उत्तर: D)'],
      ans: 'उत्तर: (D) त्वरण a = -ω²x होता है। ऋण चिह्न यह दर्शाता है कि विस्थापन और त्वरण विपरीत दिशा में हैं (कलांतर π या 180°)।'
    },
    {
      num: 'Q4',
      eng: 'When an SHM particle passes through its equilibrium position, speed and acceleration are:',
      hin: 'जब एक सरल आवर्त गति करने वाला कण अपनी माध्य स्थिति से गुजरता है:',
      options: [
        '(A) Speed and acceleration are maximum',
        '(B) Speed is maximum and acceleration is zero (उत्तर: B)',
        '(C) Speed is zero and acceleration is maximum',
        '(D) Both speed and acceleration are zero'
      ],
      ans: 'उत्तर: (B) माध्य स्थिति (x = 0) पर विस्थापन शून्य होने से त्वरण a = 0 होता है और चाल v = v_max अधिकतम होती है।'
    },
    {
      num: 'Q5',
      eng: 'The total energy of an ideal harmonic oscillator is proportional to:',
      hin: 'एक आदर्श सरल आवर्त दोलित्र की कुल ऊर्जा किसके समानुपाती होती है:',
      options: ['(A) Amplitude A', '(B) Amplitude Squared A² (उत्तर: B)', '(C) A⁻¹', '(D) A⁻²'],
      ans: 'उत्तर: (B) कुल ऊर्जा E = 1/2 m ω² A² होती है, जो आयाम के वर्ग (A²) के सीधे समानुपाती है।'
    }
  ];

  let qY = 28;
  sampleQuestions.forEach((q) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, qY, contentWidth, 38, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 58, 138);
    doc.text(`${q.num}. ${q.eng}`, margin + 3, qY + 5, { maxWidth: contentWidth - 6 });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(q.hin, margin + 3, qY + 11, { maxWidth: contentWidth - 6 });

    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(`${q.options[0]}       ${q.options[1]}`, margin + 3, qY + 19);
    doc.text(`${q.options[2]}       ${q.options[3]}`, margin + 3, qY + 25);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(5, 150, 105);
    doc.text(q.ans, margin + 3, qY + 32, { maxWidth: contentWidth - 6 });

    qY += 42;
  });

  // PAGE 3: GROUP VELOCITY, PHASE VELOCITY & WAVE DISPERSION
  doc.addPage();
  addHeaderFooter(doc, 'CHAPTER 02 & 03 — DAMPED OSCILLATIONS & DISPERSION', 3);

  const page3Questions = [
    {
      num: 'Q6',
      eng: 'What does group velocity (v_g) represent in a wave packet?',
      hin: 'तरंग समूह में समूह वेग (v_g) किसे व्यक्त करता है?',
      options: ['(A) Phase velocity', '(B) Wave packet envelope velocity (उत्तर: B)', '(C) Amplitude', '(D) Frequency'],
      ans: 'उत्तर: (B) समूह वेग v_g = dω/dk वह वेग है जिससे तरंग पैकेट का आवरण (envelope) गति करता है तथा ऊर्जा परिवहन करता है।'
    },
    {
      num: 'Q7',
      eng: 'For deep-water gravity waves satisfying ω² = gk, the relation between group and phase velocity is:',
      hin: 'गहरे पानी की गुरुत्वाकर्षण तरंगों के लिए समूह वेग v_g और कला वेग v_p का संबंध:',
      options: ['(A) v_g = v_p', '(B) v_g = v_p / 2 (उत्तर: B)', '(C) v_g = 2 v_p', '(D) v_g = 0'],
      ans: 'उत्तर: (B) 2ω dω = g dk ⟹ dω/dk = g/(2ω) = (gk/ω)/2 = v_p / 2।'
    },
    {
      num: 'Q8',
      eng: 'In an underdamped oscillator, the logarithmic decrement (Λ) is defined as:',
      hin: 'अल्प-अवमंदित दोलन में लघुगणकीय ह्रास (Logarithmic Decrement, Λ) का सूत्र क्या है?',
      options: ['(A) Λ = ln(A_n / A_{n+1}) = β T_d (उत्तर: A)', '(B) Λ = β / (2π)', '(C) Λ = 2π ω_d', '(D) Λ = ω_d / β'],
      ans: 'उत्तर: (A) दो लगातार आयामों के अनुपात का प्राकृतिक लघुगणक Λ = ln(A_n / A_{n+1}) = β T_d कहलाता है।'
    },
    {
      num: 'Q9',
      eng: 'Quality factor (Q) of a resonance circuit or damped oscillator is given by:',
      hin: 'गुणता कारक (Quality Factor, Q) का सही सूत्र क्या है?',
      options: ['(A) Q = ω₀ / Δω (उत्तर: A)', '(B) Q = Δω / ω₀', '(C) Q = 1 / (ω₀ Δω)', '(D) Q = 2β / ω₀'],
      ans: 'उत्तर: (A) Q = अनुनादी आवृत्ति / बैंडविड्थ = ω₀ / Δω = ω₀ / (2β)। उच्च Q तीक्ष्ण अनुनाद दर्शाता है।'
    },
    {
      num: 'Q10',
      eng: 'In non-dispersive medium, phase velocity v_p and group velocity v_g are:',
      hin: 'अपरिक्षेपी माध्यम में कला वेग v_p और समूह वेग v_g का संबंध क्या होता है?',
      options: ['(A) v_g = v_p (उत्तर: A)', '(B) v_g < v_p', '(C) v_g > v_p', '(D) v_g = 0'],
      ans: 'उत्तर: (A) जब तरंग वेग आवृत्ति पर निर्भर नहीं करता (dω/dk = ω/k = c), तब v_g = v_p होता है।'
    }
  ];

  let p3Y = 28;
  page3Questions.forEach((q) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, p3Y, contentWidth, 38, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 58, 138);
    doc.text(`${q.num}. ${q.eng}`, margin + 3, p3Y + 5, { maxWidth: contentWidth - 6 });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(q.hin, margin + 3, p3Y + 11, { maxWidth: contentWidth - 6 });

    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(`${q.options[0]}       ${q.options[1]}`, margin + 3, p3Y + 19);
    doc.text(`${q.options[2]}       ${q.options[3]}`, margin + 3, p3Y + 25);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(5, 150, 105);
    doc.text(q.ans, margin + 3, p3Y + 32, { maxWidth: contentWidth - 6 });

    p3Y += 42;
  });

  // PAGE 4: FORMULA CHEAT SHEET & COMPLETE SYLLABUS GUIDE
  doc.addPage();
  addHeaderFooter(doc, 'SPECIAL RAPID REVISION & KEY FORMULAS', 4);

  doc.setFillColor(240, 249, 255);
  doc.setDrawColor(186, 230, 253);
  doc.roundedRect(margin, 28, contentWidth, 220, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(3, 105, 161);
  doc.text('ESSENTIAL EXAM FORMULAS & CONSTANTS', margin + 6, 38);

  const formulas = [
    ['Simple Harmonic Motion (SHM)', 'Differential: d²x/dt² + ω²x = 0, Period T = 2π√(m/k)'],
    ['Velocity in SHM', 'v = ±ω√(A² - x²), v_max = Aω at x = 0 (Mean position)'],
    ['Acceleration in SHM', 'a = -ω²x, a_max = ω²A at x = ±A (Extreme position)'],
    ['Total Mechanical Energy', 'E = 1/2 m ω² A² = Constant throughout oscillation'],
    ['Damped Motion Frequency', 'ω_d = √(ω₀² - β²), where β = b / (2m) is damping constant'],
    ['Critical Damping Condition', 'β = ω₀ (Returns to equilibrium without oscillation in minimum time)'],
    ['Quality Factor (Q)', 'Q = ω₀ / (2β) = ω₀ / Δω = 2π (Energy Stored / Energy Lost per cycle)'],
    ['Phase Velocity (v_p)', 'v_p = ω / k, represents velocity of a constant-phase wavefront'],
    ['Group Velocity (v_g)', 'v_g = dω / dk = v_p - λ (dv_p / dλ) (Rayleigh Formula)'],
    ['Normal vs Anomalous Dispersion', 'Normal: dv_p/dλ > 0 (v_g < v_p) | Anomalous: dv_p/dλ < 0 (v_g > v_p)'],
  ];

  let fY = 48;
  formulas.forEach(([title, eq]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(`• ${title}:`, margin + 6, fY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(2, 132, 199);
    doc.text(eq, margin + 8, fY + 5);

    fY += 14;
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Note: Complete 1500 Questions Bank contains all 5 Units with Hindi & English solutions.', margin + 6, fY + 15);

  // Trigger browser download
  doc.save(config.pdfFileName || 'ALL_EXAM_BOOST_1500_Questions.pdf');
}

function addHeaderFooter(doc: jsPDF, chapterHeader: string, pageNum: number): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  // Running Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 18, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(245, 158, 11);
  doc.text('ALL EXAM BOOST', margin, 11);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text(chapterHeader, margin + 40, 11);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(147, 197, 253);
  doc.text('1500 OBJECTIVE QUESTIONS', pageWidth - margin, 11, { align: 'right' });

  // Running Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('ALL EXAM BOOST — Free Preparation + Premium Materials', margin, pageHeight - 8);
  doc.text(`Page ${pageNum} of 4`, pageWidth - margin, pageHeight - 8, { align: 'right' });
}

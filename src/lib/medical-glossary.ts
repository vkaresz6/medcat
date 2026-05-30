// Medical/Pharmaceutical Glossary – EN → HU
// British English (BMJ/Lancet standard), reviewed by Dr. Charlotte Hughes
// Covers: Cardiology, Pharmacology, Immunology, Haematology, Hepatology,
//         Nephrology, Pulmonology, Neurology, Oncology, Endocrinology,
//         Gastroenterology, Anatomy, General Clinical

export interface GlossaryEntry {
  source_term: string
  target_term: string
  definition: string
  domain: 'medical' | 'pharmaceutical'
  subject: string
  is_forbidden?: boolean
  notes?: string
}

export const MEDICAL_GLOSSARY: GlossaryEntry[] = [
  // ── CARDIOLOGY ──────────────────────────────────────────────────────────
  { source_term: "myocardial infarction", target_term: "szívinfarktus", definition: "Irreversible necrosis of heart muscle secondary to prolonged ischaemia.", domain: "medical", subject: "Cardiology" },
  { source_term: "angina pectoris", target_term: "angina pectoris", definition: "Chest pain caused by reduced coronary blood flow, typically on exertion.", domain: "medical", subject: "Cardiology" },
  { source_term: "atrial fibrillation", target_term: "pitvarfibrilláció", definition: "Irregular, often rapid heart rate caused by chaotic electrical activity in the atria.", domain: "medical", subject: "Cardiology" },
  { source_term: "heart failure", target_term: "szívelégtelenség", definition: "Inability of the heart to pump sufficient blood to meet the body's needs.", domain: "medical", subject: "Cardiology" },
  { source_term: "left ventricular ejection fraction", target_term: "bal kamrai ejekciós frakció", definition: "Percentage of blood ejected from the left ventricle with each contraction.", domain: "medical", subject: "Cardiology", notes: "Abbrev: LVEF" },
  { source_term: "coronary artery disease", target_term: "koszorúér-betegség", definition: "Narrowing of the coronary arteries due to atherosclerosis.", domain: "medical", subject: "Cardiology", notes: "Abbrev: CAD" },
  { source_term: "percutaneous coronary intervention", target_term: "perkután koronária-intervenció", definition: "Minimally invasive procedure to open blocked coronary arteries.", domain: "medical", subject: "Cardiology", notes: "Abbrev: PCI" },
  { source_term: "antiplatelet therapy", target_term: "vérlemezkegátló kezelés", definition: "Treatment that reduces platelet aggregation to prevent thrombus formation.", domain: "pharmaceutical", subject: "Cardiology" },
  { source_term: "dual antiplatelet therapy", target_term: "kettős vérlemezkegátló kezelés", definition: "Combination of two antiplatelet agents, typically aspirin and a P2Y12 inhibitor.", domain: "pharmaceutical", subject: "Cardiology", notes: "Abbrev: DAPT" },
  { source_term: "P2Y12 inhibitor", target_term: "P2Y12-gátló", definition: "Drug class that blocks the platelet ADP receptor to inhibit aggregation.", domain: "pharmaceutical", subject: "Cardiology" },
  { source_term: "cardiac tamponade", target_term: "szívtamponád", definition: "Compression of the heart by fluid accumulation in the pericardial sac.", domain: "medical", subject: "Cardiology" },
  { source_term: "aortic stenosis", target_term: "aortaszűkület", definition: "Narrowing of the aortic valve opening, obstructing left ventricular outflow.", domain: "medical", subject: "Cardiology" },
  { source_term: "ventricular tachycardia", target_term: "kamrai tachycardia", definition: "Rapid heart rate originating from the ventricles.", domain: "medical", subject: "Cardiology", notes: "Abbrev: VT" },
  { source_term: "bradycardia", target_term: "bradycardia", definition: "Heart rate below 60 beats per minute.", domain: "medical", subject: "Cardiology" },
  { source_term: "hypertension", target_term: "magas vérnyomás", definition: "Persistently elevated arterial blood pressure.", domain: "medical", subject: "Cardiology" },
  { source_term: "dyslipidaemia", target_term: "diszlipidémia", definition: "Abnormal levels of lipids or lipoproteins in the blood.", domain: "medical", subject: "Cardiology" },
  { source_term: "pericarditis", target_term: "pericarditis", definition: "Inflammation of the pericardium, the sac surrounding the heart.", domain: "medical", subject: "Cardiology" },
  { source_term: "thrombus", target_term: "thrombus", definition: "Blood clot formed within a blood vessel.", domain: "medical", subject: "Cardiology" },
  { source_term: "embolism", target_term: "embólia", definition: "Obstruction of a blood vessel by a detached clot, air bubble, or other material.", domain: "medical", subject: "Cardiology" },
  { source_term: "atherosclerosis", target_term: "atherosclerosis", definition: "Buildup of plaques within arterial walls, reducing luminal diameter.", domain: "medical", subject: "Cardiology" },

  // ── PHARMACOLOGY ────────────────────────────────────────────────────────
  { source_term: "contraindication", target_term: "ellenjavallat", definition: "A condition that makes a particular treatment inadvisable.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "adverse drug reaction", target_term: "gyógyszer-mellékhatás", definition: "Unintended, harmful response to a medication at a standard dose.", domain: "pharmaceutical", subject: "Pharmacology", notes: "Abbrev: ADR" },
  { source_term: "pharmacokinetics", target_term: "farmakokinetika", definition: "Study of drug absorption, distribution, metabolism, and excretion.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "pharmacodynamics", target_term: "farmakodinamika", definition: "Study of the biochemical and physiological effects of drugs on the body.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "bioavailability", target_term: "biohasznosíthatóság", definition: "Proportion of a drug that reaches systemic circulation in unchanged form.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "half-life", target_term: "felezési idő", definition: "Time required for the concentration of a drug to halve.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "loading dose", target_term: "telítő dózis", definition: "Initial, larger dose given to rapidly achieve therapeutic drug levels.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "maintenance dose", target_term: "fenntartó dózis", definition: "Regular dose given to sustain a therapeutic drug concentration.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "drug interaction", target_term: "gyógyszerkölcsönhatás", definition: "Modified effect of a drug caused by concurrent use of another substance.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "therapeutic index", target_term: "terápiás index", definition: "Ratio between the toxic dose and the therapeutic dose of a drug.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "off-label use", target_term: "engedélyen kívüli alkalmazás", definition: "Use of a medicine in a manner not specified in its approved labelling.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "excipient", target_term: "segédanyag", definition: "Inactive substance used as a carrier for active pharmaceutical ingredients.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "active substance", target_term: "hatóanyag", definition: "Component of a drug product responsible for its therapeutic effect.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "placebo", target_term: "placebo", definition: "Inert substance used as a control in clinical trials.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "dose-dependent", target_term: "dózisfüggő", definition: "Effect that varies in proportion to the amount of drug administered.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "monoamine oxidase inhibitor", target_term: "monoamin-oxidáz-gátló", definition: "Drug class that inhibits monoamine oxidase enzymes, used in depression and Parkinson's disease.", domain: "pharmaceutical", subject: "Pharmacology", notes: "Abbrev: MAOI" },
  { source_term: "beta-lactam antibiotic", target_term: "béta-laktám antibiotikum", definition: "Antibiotic class sharing a beta-lactam ring structure, including penicillins and cephalosporins.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "anticoagulant", target_term: "antikoaguláns", definition: "Drug that inhibits blood coagulation.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "fibrinolytic", target_term: "fibrinolitikum", definition: "Agent that dissolves fibrin clots; also called thrombolytic.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "statin", target_term: "sztatin", definition: "HMG-CoA reductase inhibitor used to lower LDL cholesterol.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "ACE inhibitor", target_term: "ACE-gátló", definition: "Angiotensin-converting enzyme inhibitor used in hypertension and heart failure.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "beta-blocker", target_term: "béta-blokkoló", definition: "Drug that blocks beta-adrenergic receptors, reducing heart rate and blood pressure.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "diuretic", target_term: "diuretikum", definition: "Drug that promotes the excretion of urine, reducing fluid volume.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "proton pump inhibitor", target_term: "protonpumpa-gátló", definition: "Drug class that reduces gastric acid production by inhibiting H+/K+-ATPase.", domain: "pharmaceutical", subject: "Pharmacology", notes: "Abbrev: PPI" },
  { source_term: "corticosteroid", target_term: "kortikoszteroid", definition: "Steroid hormone or synthetic analogue with anti-inflammatory and immunosuppressive effects.", domain: "pharmaceutical", subject: "Pharmacology" },
  { source_term: "non-steroidal anti-inflammatory drug", target_term: "nem szteroid gyulladáscsökkentő", definition: "Drug class that inhibits cyclooxygenase enzymes, reducing pain and inflammation.", domain: "pharmaceutical", subject: "Pharmacology", notes: "Abbrev: NSAID" },
  { source_term: "immunosuppressant", target_term: "immunszuppresszív szer", definition: "Drug that reduces the activity of the immune system.", domain: "pharmaceutical", subject: "Pharmacology" },

  // ── IMMUNOLOGY / ALLERGY ─────────────────────────────────────────────────
  { source_term: "hypersensitivity", target_term: "túlérzékenység", definition: "Exaggerated immune response to an antigen, potentially causing tissue damage.", domain: "medical", subject: "Immunology" },
  { source_term: "anaphylaxis", target_term: "anafilaxia", definition: "Severe, life-threatening systemic hypersensitivity reaction.", domain: "medical", subject: "Immunology" },
  { source_term: "autoimmune disease", target_term: "autoimmun betegség", definition: "Condition in which the immune system attacks the body's own tissues.", domain: "medical", subject: "Immunology" },
  { source_term: "antigen", target_term: "antigén", definition: "Substance recognised by the immune system as foreign, triggering an immune response.", domain: "medical", subject: "Immunology" },
  { source_term: "antibody", target_term: "antitest", definition: "Immunoglobulin produced by B cells that binds specifically to an antigen.", domain: "medical", subject: "Immunology" },
  { source_term: "immunoglobulin", target_term: "immunglobulin", definition: "Glycoprotein functioning as an antibody, produced by plasma cells.", domain: "medical", subject: "Immunology" },
  { source_term: "cytokine", target_term: "citokin", definition: "Signalling protein secreted by immune cells that regulates immune responses.", domain: "medical", subject: "Immunology" },
  { source_term: "inflammation", target_term: "gyulladás", definition: "Biological response to harmful stimuli, characterised by redness, swelling, heat, and pain.", domain: "medical", subject: "Immunology" },
  { source_term: "allergy", target_term: "allergia", definition: "Immune system reaction to a normally harmless substance.", domain: "medical", subject: "Immunology" },

  // ── HAEMATOLOGY ──────────────────────────────────────────────────────────
  { source_term: "anaemia", target_term: "anaemia", definition: "Reduction in the number of red blood cells or haemoglobin concentration.", domain: "medical", subject: "Haematology" },
  { source_term: "haemoglobin", target_term: "hemoglobin", definition: "Iron-containing protein in red blood cells that carries oxygen.", domain: "medical", subject: "Haematology" },
  { source_term: "platelet", target_term: "vérlemezke", definition: "Small blood cell fragment involved in clotting.", domain: "medical", subject: "Haematology" },
  { source_term: "platelet aggregation", target_term: "vérlemezke-aggregáció", definition: "Clustering of platelets at sites of vascular injury, initiating coagulation.", domain: "medical", subject: "Haematology" },
  { source_term: "coagulation", target_term: "véralvadás", definition: "Process by which blood changes from a liquid to a gel, forming a clot.", domain: "medical", subject: "Haematology" },
  { source_term: "international normalised ratio", target_term: "INR", definition: "Standardised measure of blood coagulation time used to monitor anticoagulant therapy.", domain: "medical", subject: "Haematology", notes: "Abbrev: INR" },
  { source_term: "deep vein thrombosis", target_term: "mélyvénás trombózis", definition: "Formation of a blood clot in a deep vein, usually in the leg.", domain: "medical", subject: "Haematology", notes: "Abbrev: DVT" },
  { source_term: "pulmonary embolism", target_term: "tüdőembólia", definition: "Blockage of a pulmonary artery by a detached clot, usually from a DVT.", domain: "medical", subject: "Haematology", notes: "Abbrev: PE" },
  { source_term: "white blood cell", target_term: "fehérvérsejt", definition: "Blood cell that forms part of the immune system.", domain: "medical", subject: "Haematology", notes: "Abbrev: WBC; also: leucocyte" },
  { source_term: "neutropenia", target_term: "neutropenia", definition: "Abnormally low neutrophil count, increasing susceptibility to infection.", domain: "medical", subject: "Haematology" },
  { source_term: "thrombocytopenia", target_term: "thrombocytopenia", definition: "Abnormally low platelet count.", domain: "medical", subject: "Haematology" },

  // ── HEPATOLOGY ───────────────────────────────────────────────────────────
  { source_term: "hepatic impairment", target_term: "májelégtelenség", definition: "Reduced capacity of the liver to perform its normal functions.", domain: "medical", subject: "Hepatology" },
  { source_term: "cirrhosis", target_term: "cirrhosis", definition: "Irreversible scarring of the liver, impairing its function.", domain: "medical", subject: "Hepatology" },
  { source_term: "hepatitis", target_term: "hepatitis", definition: "Inflammation of the liver, most commonly caused by viral infection.", domain: "medical", subject: "Hepatology" },
  { source_term: "jaundice", target_term: "sárgaság", definition: "Yellowing of the skin and sclerae caused by elevated bilirubin.", domain: "medical", subject: "Hepatology" },
  { source_term: "bilirubin", target_term: "bilirubin", definition: "Breakdown product of haem metabolism excreted by the liver.", domain: "medical", subject: "Hepatology" },
  { source_term: "alanine aminotransferase", target_term: "alanin-aminotranszferáz", definition: "Liver enzyme elevated in hepatocellular damage.", domain: "medical", subject: "Hepatology", notes: "Abbrev: ALT" },
  { source_term: "aspartate aminotransferase", target_term: "aszpartát-aminotranszferáz", definition: "Enzyme elevated in liver, cardiac, and muscle damage.", domain: "medical", subject: "Hepatology", notes: "Abbrev: AST" },

  // ── NEPHROLOGY ───────────────────────────────────────────────────────────
  { source_term: "renal function", target_term: "vesefunkció", definition: "Ability of the kidneys to filter blood and excrete waste products.", domain: "medical", subject: "Nephrology" },
  { source_term: "creatinine", target_term: "kreatinin", definition: "Waste product of muscle metabolism, used as a marker of renal function.", domain: "medical", subject: "Nephrology" },
  { source_term: "glomerular filtration rate", target_term: "glomeruláris filtrációs ráta", definition: "Rate at which the kidneys filter blood; key indicator of renal function.", domain: "medical", subject: "Nephrology", notes: "Abbrev: GFR" },
  { source_term: "acute kidney injury", target_term: "akut vesekárosodás", definition: "Sudden episode of kidney failure or damage within a short period.", domain: "medical", subject: "Nephrology", notes: "Abbrev: AKI" },
  { source_term: "chronic kidney disease", target_term: "krónikus vesebetegség", definition: "Long-standing, progressive loss of kidney function.", domain: "medical", subject: "Nephrology", notes: "Abbrev: CKD" },
  { source_term: "proteinuria", target_term: "proteinuria", definition: "Abnormal presence of protein in the urine, indicating kidney damage.", domain: "medical", subject: "Nephrology" },
  { source_term: "dialysis", target_term: "dialízis", definition: "Procedure that removes waste and excess fluid from the blood when the kidneys cannot.", domain: "medical", subject: "Nephrology" },

  // ── PULMONOLOGY / RESPIRATORY ────────────────────────────────────────────
  { source_term: "asthma", target_term: "asztma", definition: "Chronic inflammatory disease of the airways causing recurrent wheeze and breathlessness.", domain: "medical", subject: "Pulmonology" },
  { source_term: "chronic obstructive pulmonary disease", target_term: "krónikus obstruktív tüdőbetegség", definition: "Progressive lung disease characterised by airflow limitation.", domain: "medical", subject: "Pulmonology", notes: "Abbrev: COPD" },
  { source_term: "pneumonia", target_term: "tüdőgyulladás", definition: "Infection causing inflammation of the alveoli, usually bacterial or viral.", domain: "medical", subject: "Pulmonology" },
  { source_term: "dyspnoea", target_term: "dyspnoea", definition: "Subjective sensation of difficulty or discomfort in breathing.", domain: "medical", subject: "Pulmonology" },
  { source_term: "bronchospasm", target_term: "bronchospasmus", definition: "Sudden constriction of the muscles in the walls of the bronchi.", domain: "medical", subject: "Pulmonology" },
  { source_term: "spirometry", target_term: "spirometria", definition: "Pulmonary function test measuring airflow and lung volumes.", domain: "medical", subject: "Pulmonology" },
  { source_term: "oxygen saturation", target_term: "oxigénszaturáció", definition: "Percentage of haemoglobin binding sites occupied by oxygen.", domain: "medical", subject: "Pulmonology", notes: "Abbrev: SpO₂ (pulse oximetry), SaO₂ (arterial)" },
  { source_term: "respiratory failure", target_term: "légzési elégtelenség", definition: "Inability of the respiratory system to maintain adequate gas exchange.", domain: "medical", subject: "Pulmonology" },

  // ── NEUROLOGY ────────────────────────────────────────────────────────────
  { source_term: "stroke", target_term: "stroke", definition: "Sudden neurological deficit caused by interruption of blood supply to the brain.", domain: "medical", subject: "Neurology" },
  { source_term: "transient ischaemic attack", target_term: "tranziens ischaemiás attak", definition: "Brief episode of neurological dysfunction due to temporary cerebral ischaemia, resolving within 24 hours.", domain: "medical", subject: "Neurology", notes: "Abbrev: TIA" },
  { source_term: "epilepsy", target_term: "epilepszia", definition: "Chronic neurological disorder characterised by recurrent unprovoked seizures.", domain: "medical", subject: "Neurology" },
  { source_term: "seizure", target_term: "roham", definition: "Sudden, uncontrolled electrical disturbance in the brain.", domain: "medical", subject: "Neurology" },
  { source_term: "neuropathy", target_term: "neuropátia", definition: "Damage or dysfunction of peripheral nerves.", domain: "medical", subject: "Neurology" },
  { source_term: "dementia", target_term: "demencia", definition: "Progressive decline in cognitive function affecting daily living.", domain: "medical", subject: "Neurology" },
  { source_term: "migraine", target_term: "migréne", definition: "Recurrent headache disorder, often unilateral and associated with nausea.", domain: "medical", subject: "Neurology" },
  { source_term: "Parkinson's disease", target_term: "Parkinson-kór", definition: "Progressive neurodegenerative disorder characterised by tremor, rigidity, and bradykinesia.", domain: "medical", subject: "Neurology" },

  // ── ONCOLOGY ─────────────────────────────────────────────────────────────
  { source_term: "malignancy", target_term: "malignus daganat", definition: "Cancerous tumour with potential for invasion and metastasis.", domain: "medical", subject: "Oncology" },
  { source_term: "metastasis", target_term: "metasztázis", definition: "Spread of cancer cells from the primary site to distant organs.", domain: "medical", subject: "Oncology" },
  { source_term: "chemotherapy", target_term: "kemoterápia", definition: "Treatment of cancer using cytotoxic drugs.", domain: "pharmaceutical", subject: "Oncology" },
  { source_term: "radiotherapy", target_term: "sugárterápia", definition: "Treatment using ionising radiation to destroy cancer cells.", domain: "medical", subject: "Oncology" },
  { source_term: "immunotherapy", target_term: "immunoterápia", definition: "Treatment that uses the immune system to fight cancer.", domain: "pharmaceutical", subject: "Oncology" },
  { source_term: "targeted therapy", target_term: "célzott terápia", definition: "Drug treatment that targets specific molecules involved in cancer growth.", domain: "pharmaceutical", subject: "Oncology" },
  { source_term: "tumour marker", target_term: "tumormarker", definition: "Biomarker found in blood or tissue whose level indicates presence of cancer.", domain: "medical", subject: "Oncology" },
  { source_term: "biopsy", target_term: "biopszia", definition: "Removal and examination of tissue to diagnose disease.", domain: "medical", subject: "Oncology" },

  // ── ENDOCRINOLOGY ────────────────────────────────────────────────────────
  { source_term: "diabetes mellitus", target_term: "diabetes mellitus", definition: "Metabolic disease characterised by chronic hyperglycaemia due to insulin deficiency or resistance.", domain: "medical", subject: "Endocrinology" },
  { source_term: "insulin resistance", target_term: "inzulinrezisztencia", definition: "Reduced sensitivity of cells to the action of insulin.", domain: "medical", subject: "Endocrinology" },
  { source_term: "hyperglycaemia", target_term: "hiperglikémia", definition: "Abnormally elevated blood glucose concentration.", domain: "medical", subject: "Endocrinology" },
  { source_term: "hypoglycaemia", target_term: "hipoglikémia", definition: "Abnormally low blood glucose concentration.", domain: "medical", subject: "Endocrinology" },
  { source_term: "hypothyroidism", target_term: "hypothyreosis", definition: "Underactivity of the thyroid gland, leading to reduced hormone production.", domain: "medical", subject: "Endocrinology" },
  { source_term: "hyperthyroidism", target_term: "hyperthyreosis", definition: "Overactivity of the thyroid gland, leading to excess hormone production.", domain: "medical", subject: "Endocrinology" },
  { source_term: "HbA1c", target_term: "HbA1c", definition: "Glycated haemoglobin; reflects average blood glucose over the preceding 8–12 weeks.", domain: "medical", subject: "Endocrinology" },
  { source_term: "insulin", target_term: "inzulin", definition: "Pancreatic hormone that regulates glucose uptake.", domain: "pharmaceutical", subject: "Endocrinology" },
  { source_term: "glucocorticoid", target_term: "glükokortikoid", definition: "Class of corticosteroids involved in glucose metabolism and immune suppression.", domain: "pharmaceutical", subject: "Endocrinology" },

  // ── GASTROENTEROLOGY ────────────────────────────────────────────────────
  { source_term: "gastro-oesophageal reflux disease", target_term: "gastrooesophageális reflux betegség", definition: "Condition in which stomach acid flows back into the oesophagus.", domain: "medical", subject: "Gastroenterology", notes: "Abbrev: GORD (British); GERD (American)" },
  { source_term: "peptic ulcer", target_term: "peptikus fekély", definition: "Open sore on the lining of the stomach or duodenum.", domain: "medical", subject: "Gastroenterology" },
  { source_term: "inflammatory bowel disease", target_term: "gyulladásos bélbetegség", definition: "Chronic inflammation of the digestive tract; includes Crohn's disease and ulcerative colitis.", domain: "medical", subject: "Gastroenterology", notes: "Abbrev: IBD" },
  { source_term: "irritable bowel syndrome", target_term: "irritábilis bél szindróma", definition: "Functional disorder of the intestines causing abdominal pain and altered bowel habits.", domain: "medical", subject: "Gastroenterology", notes: "Abbrev: IBS" },
  { source_term: "nausea", target_term: "hányinger", definition: "Sensation of discomfort in the stomach with an urge to vomit.", domain: "medical", subject: "Gastroenterology" },
  { source_term: "gastrointestinal bleeding", target_term: "gastrointestinalis vérzés", definition: "Blood loss from any part of the gastrointestinal tract.", domain: "medical", subject: "Gastroenterology" },

  // ── ANATOMY ──────────────────────────────────────────────────────────────
  { source_term: "heart muscle", target_term: "szívizom", definition: "Specialised cardiac muscle tissue forming the bulk of the heart wall.", domain: "medical", subject: "Anatomy" },
  { source_term: "left ventricle", target_term: "bal kamra", definition: "Lower left chamber of the heart that pumps oxygenated blood to the body.", domain: "medical", subject: "Anatomy" },
  { source_term: "right ventricle", target_term: "jobb kamra", definition: "Lower right chamber of the heart that pumps deoxygenated blood to the lungs.", domain: "medical", subject: "Anatomy" },
  { source_term: "aorta", target_term: "aorta", definition: "Main artery leaving the left ventricle, supplying oxygenated blood to the body.", domain: "medical", subject: "Anatomy" },
  { source_term: "coronary artery", target_term: "koszorúér", definition: "Artery supplying blood to the heart muscle.", domain: "medical", subject: "Anatomy" },
  { source_term: "pulmonary artery", target_term: "tüdőartéria", definition: "Artery carrying deoxygenated blood from the right ventricle to the lungs.", domain: "medical", subject: "Anatomy" },
  { source_term: "oesophagus", target_term: "nyelőcső", definition: "Muscular tube connecting the pharynx to the stomach.", domain: "medical", subject: "Anatomy" },
  { source_term: "diaphragm", target_term: "rekeszizom", definition: "Dome-shaped muscle separating the thoracic and abdominal cavities, essential for breathing.", domain: "medical", subject: "Anatomy" },

  // ── GENERAL CLINICAL ────────────────────────────────────────────────────
  { source_term: "diagnosis", target_term: "diagnózis", definition: "Identification of a disease or condition by its signs and symptoms.", domain: "medical", subject: "Clinical" },
  { source_term: "prognosis", target_term: "prognózis", definition: "Predicted outcome of a disease.", domain: "medical", subject: "Clinical" },
  { source_term: "sign", target_term: "tünet (objektív)", definition: "Objective indicator of disease detectable by a clinician.", domain: "medical", subject: "Clinical", notes: "Distinguished from symptom, which is subjective" },
  { source_term: "symptom", target_term: "panasz", definition: "Subjective experience reported by the patient.", domain: "medical", subject: "Clinical" },
  { source_term: "acute", target_term: "akut", definition: "Of rapid onset and short duration.", domain: "medical", subject: "Clinical" },
  { source_term: "chronic", target_term: "krónikus", definition: "Of long duration or slow progression.", domain: "medical", subject: "Clinical" },
  { source_term: "comorbidity", target_term: "komorbiditás", definition: "Presence of one or more additional conditions co-occurring with a primary condition.", domain: "medical", subject: "Clinical" },
  { source_term: "mortality", target_term: "mortalitás", definition: "Number of deaths in a given population over a defined period.", domain: "medical", subject: "Clinical" },
  { source_term: "morbidity", target_term: "morbiditás", definition: "State of being diseased; incidence or prevalence of disease.", domain: "medical", subject: "Clinical" },
  { source_term: "aetiology", target_term: "etiológia", definition: "Study of the causes or origins of a disease.", domain: "medical", subject: "Clinical" },
  { source_term: "pathophysiology", target_term: "patofiziológia", definition: "Study of the functional changes associated with disease.", domain: "medical", subject: "Clinical" },
  { source_term: "idiopathic", target_term: "idiopátiás", definition: "Of unknown cause.", domain: "medical", subject: "Clinical" },
  { source_term: "palliative care", target_term: "palliatív ellátás", definition: "Care focused on relieving symptoms and improving quality of life in serious illness.", domain: "medical", subject: "Clinical" },
  { source_term: "informed consent", target_term: "tájékozott beleegyezés", definition: "Patient agreement to treatment after receiving and understanding relevant information.", domain: "medical", subject: "Clinical" },
  { source_term: "clinical trial", target_term: "klinikai vizsgálat", definition: "Research study to evaluate the safety and efficacy of medical interventions in humans.", domain: "medical", subject: "Clinical" },
  { source_term: "randomised controlled trial", target_term: "randomizált kontrollált vizsgálat", definition: "Gold-standard study design in which participants are randomly allocated to treatment or control groups.", domain: "medical", subject: "Clinical", notes: "Abbrev: RCT" },
  { source_term: "placebo-controlled", target_term: "placebokontrollos", definition: "Trial design in which one group receives a placebo for comparison.", domain: "medical", subject: "Clinical" },
  { source_term: "double-blind", target_term: "kettős vak", definition: "Trial design in which neither participants nor investigators know which treatment is administered.", domain: "medical", subject: "Clinical" },
  { source_term: "evidence-based medicine", target_term: "bizonyítékalapú orvoslás", definition: "Clinical decision-making based on the best available research evidence.", domain: "medical", subject: "Clinical", notes: "Abbrev: EBM" },
  { source_term: "meta-analysis", target_term: "metaanalízis", definition: "Statistical combination of results from multiple independent studies.", domain: "medical", subject: "Clinical" },
  { source_term: "systematic review", target_term: "szisztematikus áttekintés", definition: "Comprehensive synthesis of evidence on a defined clinical question.", domain: "medical", subject: "Clinical" },
  { source_term: "elderly patients", target_term: "idős betegek", definition: "Patients typically aged 65 years or older.", domain: "medical", subject: "Clinical" },
  { source_term: "paediatric patients", target_term: "gyermekbetegek", definition: "Patients under 18 years of age.", domain: "medical", subject: "Clinical" },
  { source_term: "standard of care", target_term: "terápiás standard", definition: "Accepted, established medical treatment for a given condition.", domain: "medical", subject: "Clinical" },
  { source_term: "treatment protocol", target_term: "kezelési protokoll", definition: "Set of standardised procedures for treating a medical condition.", domain: "medical", subject: "Clinical" },
  { source_term: "long-term therapy", target_term: "hosszú távú kezelés", definition: "Treatment administered over an extended period, typically months to years.", domain: "medical", subject: "Clinical" },
  { source_term: "monitoring", target_term: "monitorozás", definition: "Regular observation and testing to assess a patient's condition or treatment response.", domain: "medical", subject: "Clinical" },
]

export const GLOSSARY_SUBJECTS = [
  "Cardiology",
  "Pharmacology",
  "Immunology",
  "Haematology",
  "Hepatology",
  "Nephrology",
  "Pulmonology",
  "Neurology",
  "Oncology",
  "Endocrinology",
  "Gastroenterology",
  "Anatomy",
  "Clinical",
] as const

export type GlossarySubject = (typeof GLOSSARY_SUBJECTS)[number]

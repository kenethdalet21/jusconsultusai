// Complete Document Templates for JusConsultus AI
// All Philippine Legal Document Templates

const DOCUMENT_TEMPLATES = {
  // Pleadings
  complaint: {
    title: 'Complaint',
    category: 'pleadings',
    content: `<p style="text-align: center; font-weight: bold;">REPUBLIC OF THE PHILIPPINES</p>
<p style="text-align: center;">REGIONAL TRIAL COURT</p>
<p style="text-align: center;">_______ Judicial Region</p>
<p style="text-align: center;">Branch ___</p>
<p style="text-align: center;">[City/Municipality], [Province]</p>
<br>
<p><strong>[PLAINTIFF NAME],</strong></p>
<p style="padding-left: 2rem;">Plaintiff,</p>
<br>
<p style="text-align: center;">- versus -</p>
<p style="text-align: right;">Civil Case No. ___________</p>
<br>
<p><strong>[DEFENDANT NAME],</strong></p>
<p style="padding-left: 2rem;">Defendant.</p>
<p>x - - - - - - - - - - - - - - - - - - - - - - - x</p>
<br>
<p style="text-align: center; font-weight: bold; text-decoration: underline;">COMPLAINT</p>
<br>
<p>COMES NOW, the Plaintiff, by counsel, unto this Honorable Court, most respectfully states:</p>
<br>
<p><strong>I. THE PARTIES</strong></p>
<br>
<p>1. Plaintiff [NAME] is of legal age, Filipino, and with residence and postal address at [ADDRESS];</p>
<br>
<p>2. Defendant [NAME] is likewise of legal age, Filipino, and with residence and postal address at [ADDRESS], where he/she may be served with summons and other court processes;</p>
<br>
<p><strong>II. STATEMENT OF FACTS</strong></p>
<br>
<p>3. [State the facts constituting the cause of action];</p>
<br>
<p><strong>III. CAUSE OF ACTION</strong></p>
<br>
<p>4. [State the legal basis for the complaint];</p>
<br>
<p><strong>IV. PRAYER</strong></p>
<br>
<p>WHEREFORE, premises considered, it is most respectfully prayed that after due notice and hearing, judgment be rendered in favor of the Plaintiff and against the Defendant:</p>
<br>
<p style="padding-left: 2rem;">a) [Relief sought];</p>
<p style="padding-left: 2rem;">b) [Other reliefs];</p>
<p style="padding-left: 2rem;">c) Such other relief as may be deemed just and equitable under the premises.</p>
<br>
<p style="padding-left: 15rem;">[City], Philippines, [Date].</p>
<br>
<p style="padding-left: 15rem; text-align: center;">_________________________</p>
<p style="padding-left: 15rem; text-align: center;"><strong>COUNSEL FOR PLAINTIFF</strong></p>`
  },

  answer: {
    title: 'Answer',
    category: 'pleadings',
    content: `<p style="text-align: center; font-weight: bold;">REPUBLIC OF THE PHILIPPINES</p>
<p style="text-align: center;">REGIONAL TRIAL COURT</p>
<p style="text-align: center;">_______ Judicial Region</p>
<p style="text-align: center;">Branch ___</p>
<p style="text-align: center;">[City/Municipality], [Province]</p>
<br>
<p><strong>[PLAINTIFF NAME],</strong></p>
<p style="padding-left: 2rem;">Plaintiff,</p>
<br>
<p style="text-align: center;">- versus -</p>
<p style="text-align: right;">Civil Case No. ___________</p>
<br>
<p><strong>[DEFENDANT NAME],</strong></p>
<p style="padding-left: 2rem;">Defendant.</p>
<p>x - - - - - - - - - - - - - - - - - - - - - - - x</p>
<br>
<p style="text-align: center; font-weight: bold; text-decoration: underline;">ANSWER</p>
<br>
<p>COMES NOW, the Defendant, by counsel, unto this Honorable Court, and to the Complaint filed by the Plaintiff, most respectfully states:</p>
<br>
<p><strong>SPECIAL AND AFFIRMATIVE DEFENSES</strong></p>
<br>
<p>1. Defendant specifically denies the material allegations in paragraphs [specify paragraphs] of the Complaint for being false and without basis in fact and in law;</p>
<br>
<p>2. Admitting for the sake of argument the allegations in the Complaint, which admissions are made solely for purposes of this pleading, the same do not state a cause of action against the Defendant;</p>
<br>
<p>3. [State other affirmative defenses];</p>
<br>
<p><strong>PRAYER</strong></p>
<br>
<p>WHEREFORE, it is most respectfully prayed that the Complaint be DISMISSED for lack of merit and cause of action.</p>
<br>
<p>Defendant further prays for such other reliefs as may be just and equitable under the premises.</p>
<br>
<p style="padding-left: 15rem;">[City], Philippines, [Date].</p>
<br>
<p style="padding-left: 15rem; text-align: center;">_________________________</p>
<p style="padding-left: 15rem; text-align: center;"><strong>COUNSEL FOR DEFENDANT</strong></p>`
  },

  motion: {
    title: 'Motion',
    category: 'pleadings',
    content: `<p style="text-align: center; font-weight: bold;">REPUBLIC OF THE PHILIPPINES</p>
<p style="text-align: center;">REGIONAL TRIAL COURT</p>
<p style="text-align: center;">_______ Judicial Region</p>
<p style="text-align: center;">Branch ___</p>
<p style="text-align: center;">[City/Municipality], [Province]</p>
<br>
<p><strong>[PLAINTIFF NAME],</strong></p>
<p style="padding-left: 2rem;">Plaintiff,</p>
<br>
<p style="text-align: center;">- versus -</p>
<p style="text-align: right;">Civil Case No. ___________</p>
<br>
<p><strong>[DEFENDANT NAME],</strong></p>
<p style="padding-left: 2rem;">Defendant.</p>
<p>x - - - - - - - - - - - - - - - - - - - - - - - x</p>
<br>
<p style="text-align: center; font-weight: bold; text-decoration: underline;">MOTION FOR [SPECIFY RELIEF SOUGHT]</p>
<br>
<p>COMES NOW, the [Plaintiff/Defendant], by counsel, unto this Honorable Court, most respectfully states:</p>
<br>
<p>1. [State the factual basis for the motion];</p>
<br>
<p>2. [State the legal basis for the motion];</p>
<br>
<p>3. [State other relevant facts and arguments];</p>
<br>
<p><strong>PRAYER</strong></p>
<br>
<p>WHEREFORE, it is most respectfully prayed that after due notice and hearing, this Honorable Court issue an Order granting [specify the relief sought].</p>
<br>
<p>Other reliefs just and equitable under the premises are likewise prayed for.</p>
<br>
<p style="padding-left: 15rem;">[City], Philippines, [Date].</p>
<br>
<p style="padding-left: 15rem; text-align: center;">_________________________</p>
<p style="padding-left: 15rem; text-align: center;"><strong>COUNSEL</strong></p>
<br>
<p style="text-align: center; font-weight: bold;">NOTICE OF HEARING</p>
<br>
<p>To: [Adverse Party's Counsel]</p>
<p style="padding-left: 2rem;">[Address]</p>
<br>
<p>Please take notice that the undersigned shall submit the foregoing Motion for the consideration and approval of this Honorable Court on _____________ at ______ o'clock in the [morning/afternoon] or as soon thereafter as counsel may be heard.</p>
<br>
<p style="padding-left: 15rem;">[City], Philippines, [Date].</p>
<br>
<p style="padding-left: 15rem; text-align: center;">_________________________</p>
<p style="padding-left: 15rem; text-align: center;"><strong>COUNSEL</strong></p>`
  },

  petition: {
    title: 'Petition',
    category: 'pleadings',
    content: `<p style="text-align: center; font-weight: bold;">REPUBLIC OF THE PHILIPPINES</p>
<p style="text-align: center;">[COURT NAME]</p>
<p style="text-align: center;">[LOCATION]</p>
<br>
<p><strong>[PETITIONER NAME],</strong></p>
<p style="padding-left: 2rem;">Petitioner,</p>
<br>
<p style="text-align: center;">- versus -</p>
<p style="text-align: right;">Case No. ___________</p>
<br>
<p><strong>[RESPONDENT NAME],</strong></p>
<p style="padding-left: 2rem;">Respondent.</p>
<p>x - - - - - - - - - - - - - - - - - - - - - - - x</p>
<br>
<p style="text-align: center; font-weight: bold; text-decoration: underline;">PETITION FOR [SPECIFY TYPE OF PETITION]</p>
<br>
<p>Petitioner, by counsel, unto this Honorable Court most respectfully alleges:</p>
<br>
<p><strong>I. PARTIES</strong></p>
<br>
<p>1. Petitioner [NAME] is of legal age, Filipino citizen, and with residence and postal address at [ADDRESS];</p>
<br>
<p>2. Respondent [NAME] is likewise of legal age, Filipino citizen, and with residence and postal address at [ADDRESS];</p>
<br>
<p><strong>II. STATEMENT OF FACTS</strong></p>
<br>
<p>3. [State relevant facts];</p>
<br>
<p><strong>III. ISSUES</strong></p>
<br>
<p>4. [State the issues presented];</p>
<br>
<p><strong>IV. ARGUMENTS</strong></p>
<br>
<p>5. [State legal arguments];</p>
<br>
<p><strong>PRAYER</strong></p>
<br>
<p>WHEREFORE, premises considered, it is most respectfully prayed that after due proceedings, this Honorable Court render judgment:</p>
<br>
<p style="padding-left: 2rem;">a) [Specific relief];</p>
<p style="padding-left: 2rem;">b) [Other reliefs].</p>
<br>
<p>Petitioner prays for such other reliefs as may be deemed just and equitable under the premises.</p>
<br>
<p style="padding-left: 15rem;">[City], Philippines, [Date].</p>
<br>
<p style="padding-left: 15rem; text-align: center;">_________________________</p>
<p style="padding-left: 15rem; text-align: center;"><strong>COUNSEL FOR PETITIONER</strong></p>`
  },

  // Affidavits and Sworn Statements
  affidavit: {
    title: 'Affidavit',
    category: 'affidavits',
    content: `<p style="text-align: center; font-weight: bold;">REPUBLIC OF THE PHILIPPINES )</p>
<p style="text-align: center;">[CITY/MUNICIPALITY] ) S.S.</p>
<br>
<p style="text-align: center; font-weight: bold; text-decoration: underline;">AFFIDAVIT</p>
<br>
<p>I, <strong>[FULL NAME]</strong>, of legal age, [civil status], Filipino citizen, and with residence and postal address at [COMPLETE ADDRESS], after having been duly sworn in accordance with law, do hereby depose and state:</p>
<br>
<p>1. That I am the [state capacity/relationship, e.g., "owner of...", "employee of...", "witness to..."];</p>
<br>
<p>2. That [state the facts you are attesting to];</p>
<br>
<p>3. That [continue stating relevant facts];</p>
<br>
<p>4. That I am executing this Affidavit to attest to the truth of the foregoing facts and for whatever legal purpose this may serve.</p>
<br>
<p>IN WITNESS WHEREOF, I have hereunto set my hand this _____ day of _____________, 20___ at [CITY/MUNICIPALITY], Philippines.</p>
<br>
<br>
<p style="text-align: center;">____________________________</p>
<p style="text-align: center;"><strong>AFFIANT</strong></p>
<br>
<p style="text-align: center; font-weight: bold;">SUBSCRIBED AND SWORN</p> to before me this _____ day of _____________, 20___ at [CITY/MUNICIPALITY], Philippines, affiant exhibiting to me his/her [GOVERNMENT-ISSUED ID] bearing ID No. _________________ issued on _________________ at _________________.
<br>
<br>
<p>Doc. No. _____;</p>
<p>Page No. _____;</p>
<p>Book No. _____;</p>
<p>Series of 20___.</p>`
  },

  // Letters
  demandLetter: {
    title: 'Demand Letter',
    category: 'letters',
    content: `<p style="text-align: right;">[Date]</p>
<br>
<p><strong>[Recipient Name]</strong></p>
<p>[Address Line 1]</p>
<p>[Address Line 2]</p>
<br>
<p>Dear [Mr./Ms./Mrs. Last Name],</p>
<br>
<p style="text-align: center; font-weight: bold;">RE: FORMAL DEMAND FOR PAYMENT</p>
<br>
<p>Greetings!</p>
<br>
<p>We write on behalf of our client, [CLIENT NAME], to formally demand payment of the amount of <strong>[AMOUNT IN WORDS] (PHP [AMOUNT IN FIGURES])</strong> representing [describe the nature of the obligation].</p>
<br>
<p>Our records show that despite repeated verbal and written demands, you have failed and refused, and continue to fail and refuse, to settle your obligation which has been due and demandable since [DATE].</p>
<br>
<p>In view of the foregoing, we hereby make a <strong>FINAL DEMAND</strong> upon you to pay the aforesaid amount within <strong>FIVE (5) DAYS</strong> from receipt of this letter. Otherwise, we shall be constrained to institute the appropriate legal action against you, without further notice.</p>
<br>
<p>Please be advised that in the event of litigation, you shall likewise be held liable for:</p>
<p style="padding-left: 2rem;">a) Legal interest at the rate allowed by law;</p>
<p style="padding-left: 2rem;">b) Attorney's fees equivalent to 25% of the total amount due;</p>
<p style="padding-left: 2rem;">c) Costs of suit; and</p>
<p style="padding-left: 2rem;">d) Such other relief as may be warranted under the circumstances.</p>
<br>
<p>We trust that you will give this matter your immediate and favorable attention to avoid any unpleasant consequences.</p>
<br>
<p>Thank you.</p>
<br>
<p>Very truly yours,</p>
<br>
<br>
<p style="text-decoration: underline;">____________________________</p>
<p><strong>[ATTORNEY NAME]</strong></p>
<p>Counsel for [CLIENT NAME]</p>
<p>Roll of Attorneys No. _________</p>
<p>IBP Lifetime No. _________</p>
<p>PTR No. _________, [Date], [Place]</p>
<p>MCLE Compliance No. _________</p>`
  },

  memorandum: {
    title: 'Memorandum',
    category: 'letters',
    content: `<p style="text-align: center; font-weight: bold;">MEMORANDUM</p>
<br>
<p><strong>TO:</strong> [Recipient Name/Department]</p>
<p><strong>FROM:</strong> [Your Name/Department]</p>
<p><strong>DATE:</strong> [Current Date]</p>
<p><strong>RE:</strong> [Subject Matter]</p>
<br>
<hr style="border: 1px solid #000; margin: 1rem 0;">
<br>
<p><strong>I. BACKGROUND</strong></p>
<br>
<p>[Provide background information]</p>
<br>
<p><strong>II. STATEMENT OF FACTS</strong></p>
<br>
<p>[Present the relevant facts]</p>
<br>
<p><strong>III. ISSUES</strong></p>
<br>
<p>[State the issues or questions presented]</p>
<br>
<p><strong>IV. DISCUSSION</strong></p>
<br>
<p>[Provide analysis and discussion]</p>
<br>
<p><strong>V. CONCLUSION/RECOMMENDATION</strong></p>
<br>
<p>[Present conclusions and recommendations]</p>
<br>
<br>
<p>Respectfully submitted,</p>
<br>
<br>
<p style="text-decoration: underline;">____________________________</p>
<p><strong>[YOUR NAME]</strong></p>
<p>[Title/Position]</p>`
  },

  // Contracts
  contract: {
    title: 'Contract of Service',
    category: 'contracts',
    content: `<p style="text-align: center; font-weight: bold; text-decoration: underline;">CONTRACT OF SERVICE</p>
<br>
<p>KNOW ALL MEN BY THESE PRESENTS:</p>
<br>
<p>This Contract of Service is entered into by and between:</p>
<br>
<p><strong>[PARTY A NAME]</strong>, of legal age, Filipino, and with principal office address at [ADDRESS], hereinafter referred to as the <strong>"CLIENT"</strong>;</p>
<br>
<p>- and -</p>
<br>
<p><strong>[PARTY B NAME]</strong>, of legal age, Filipino, and with address at [ADDRESS], hereinafter referred to as the <strong>"SERVICE PROVIDER"</strong>;</p>
<br>
<p style="text-align: center; font-weight: bold;">WITNESSETH: That</p>
<br>
<p><strong>WHEREAS</strong>, the CLIENT desires to engage the services of the SERVICE PROVIDER;</p>
<br>
<p><strong>WHEREAS</strong>, the SERVICE PROVIDER agrees to provide said services;</p>
<br>
<p><strong>NOW, THEREFORE</strong>, for and in consideration of the mutual covenants and agreements herein contained, the parties agree as follows:</p>
<br>
<p><strong>1. SCOPE OF SERVICES</strong></p>
<p style="padding-left: 2rem;">The SERVICE PROVIDER shall [describe services to be provided].</p>
<br>
<p><strong>2. TERM</strong></p>
<p style="padding-left: 2rem;">This Contract shall commence on [START DATE] and shall continue until [END DATE], unless earlier terminated as provided herein.</p>
<br>
<p><strong>3. COMPENSATION</strong></p>
<p style="padding-left: 2rem;">The CLIENT shall pay the SERVICE PROVIDER the amount of [AMOUNT IN WORDS] (PHP [AMOUNT IN FIGURES]) payable as follows: [payment terms].</p>
<br>
<p><strong>4. OBLIGATIONS OF THE SERVICE PROVIDER</strong></p>
<p style="padding-left: 2rem;">[Specify obligations]</p>
<br>
<p><strong>5. OBLIGATIONS OF THE CLIENT</strong></p>
<p style="padding-left: 2rem;">[Specify obligations]</p>
<br>
<p><strong>6. TERMINATION</strong></p>
<p style="padding-left: 2rem;">[Specify termination clauses]</p>
<br>
<p><strong>7. CONFIDENTIALITY</strong></p>
<p style="padding-left: 2rem;">[Specify confidentiality terms]</p>
<br>
<p><strong>8. GOVERNING LAW</strong></p>
<p style="padding-left: 2rem;">This Contract shall be governed by and construed in accordance with the laws of the Republic of the Philippines.</p>
<br>
<p>IN WITNESS WHEREOF, the parties have hereunto set their hands this _____ day of _____________, 20___ in [City], Philippines.</p>
<br>
<br>
<table style="width: 100%;">
<tr>
<td style="width: 50%; text-align: center;">
<p>____________________________</p>
<p><strong>[PARTY A NAME]</strong></p>
<p>CLIENT</p>
</td>
<td style="width: 50%; text-align: center;">
<p>____________________________</p>
<p><strong>[PARTY B NAME]</strong></p>
<p>SERVICE PROVIDER</p>
</td>
</tr>
</table>
<br>
<p><strong>SIGNED IN THE PRESENCE OF:</strong></p>
<br>
<p>____________________________</p>
<p>[Witness 1 Name]</p>
<br>
<p>____________________________</p>
<p>[Witness 2 Name]</p>`
  },

  lease: {
    title: 'Contract of Lease',
    category: 'contracts',
    content: `<p style="text-align: center; font-weight: bold; text-decoration: underline;">CONTRACT OF LEASE</p>
<br>
<p>KNOW ALL MEN BY THESE PRESENTS:</p>
<br>
<p>This Contract of Lease is entered into by and between:</p>
<br>
<p><strong>[LESSOR NAME]</strong>, of legal age, Filipino, and with address at [ADDRESS], hereinafter referred to as the <strong>"LESSOR"</strong>;</p>
<br>
<p>- and -</p>
<br>
<p><strong>[LESSEE NAME]</strong>, of legal age, Filipino, and with address at [ADDRESS], hereinafter referred to as the <strong>"LESSEE"</strong>;</p>
<br>
<p style="text-align: center; font-weight: bold;">WITNESSETH: That</p>
<br>
<p><strong>1. LEASED PREMISES</strong></p>
<p style="padding-left: 2rem;">The LESSOR hereby leases to the LESSEE the property located at [COMPLETE ADDRESS], more particularly described as follows: [property description].</p>
<br>
<p><strong>2. TERM</strong></p>
<p style="padding-left: 2rem;">The lease shall be for a period of [NUMBER] year(s) commencing on [START DATE] and ending on [END DATE].</p>
<br>
<p><strong>3. RENTAL AND PAYMENT</strong></p>
<p style="padding-left: 2rem;">The monthly rental is [AMOUNT IN WORDS] (PHP [AMOUNT IN FIGURES]) payable on or before the [DAY] day of each month.</p>
<br>
<p><strong>4. SECURITY DEPOSIT</strong></p>
<p style="padding-left: 2rem;">Upon execution of this Contract, the LESSEE shall pay a security deposit equivalent to [NUMBER] month(s) rental.</p>
<br>
<p><strong>5. USE OF PREMISES</strong></p>
<p style="padding-left: 2rem;">The leased premises shall be used exclusively for [PURPOSE].</p>
<br>
<p><strong>6. UTILITIES</strong></p>
<p style="padding-left: 2rem;">[Specify responsibility for utilities]</p>
<br>
<p><strong>7. REPAIRS AND MAINTENANCE</strong></p>
<p style="padding-left: 2rem;">[Specify maintenance responsibilities]</p>
<br>
<p><strong>8. SUBLEASE</strong></p>
<p style="padding-left: 2rem;">The LESSEE shall not sublease the premises without the prior written consent of the LESSOR.</p>
<br>
<p><strong>9. TERMINATION</strong></p>
<p style="padding-left: 2rem;">[Specify termination clauses]</p>
<br>
<p>IN WITNESS WHEREOF, the parties have hereunto set their hands this _____ day of _____________, 20___ in [City], Philippines.</p>
<br>
<br>
<table style="width: 100%;">
<tr>
<td style="width: 50%; text-align: center;">
<p>____________________________</p>
<p><strong>[LESSOR NAME]</strong></p>
<p>LESSOR</p>
</td>
<td style="width: 50%; text-align: center;">
<p>____________________________</p>
<p><strong>[LESSEE NAME]</strong></p>
<p>LESSEE</p>
</td>
</tr>
</table>`
  },

  employment: {
    title: 'Employment Contract',
    category: 'contracts',
    content: `<p style="text-align: center; font-weight: bold; text-decoration: underline;">EMPLOYMENT CONTRACT</p>
<br>
<p>This Employment Contract is entered into by and between:</p>
<br>
<p><strong>[COMPANY NAME]</strong>, a corporation duly organized under Philippine laws, with principal office at [ADDRESS], hereinafter referred to as the <strong>"EMPLOYER"</strong>;</p>
<br>
<p>- and -</p>
<br>
<p><strong>[EMPLOYEE NAME]</strong>, of legal age, Filipino, and with address at [ADDRESS], hereinafter referred to as the <strong>"EMPLOYEE"</strong>;</p>
<br>
<p><strong>WITNESSETH: That</strong></p>
<br>
<p><strong>1. POSITION AND DUTIES</strong></p>
<p style="padding-left: 2rem;">The EMPLOYER hereby employs the EMPLOYEE as [POSITION]. The EMPLOYEE shall perform the following duties: [job description].</p>
<br>
<p><strong>2. TERM</strong></p>
<p style="padding-left: 2rem;">Employment shall commence on [START DATE] and continue until [END DATE / "indefinite"].</p>
<br>
<p><strong>3. COMPENSATION</strong></p>
<p style="padding-left: 2rem;">The EMPLOYEE shall receive a monthly salary of [AMOUNT IN WORDS] (PHP [AMOUNT IN FIGURES]).</p>
<br>
<p><strong>4. BENEFITS</strong></p>
<p style="padding-left: 2rem;">[Specify benefits: SSS, Philhealth, Pag-IBIG, leave credits, etc.]</p>
<br>
<p><strong>5. WORKING HOURS</strong></p>
<p style="padding-left: 2rem;">[Specify working schedule]</p>
<br>
<p><strong>6. CONFIDENTIALITY</strong></p>
<p style="padding-left: 2rem;">The EMPLOYEE agrees to maintain confidentiality of all proprietary information.</p>
<br>
<p><strong>7. TERMINATION</strong></p>
<p style="padding-left: 2rem;">[Specify grounds and procedures for termination]</p>
<br>
<p><strong>8. GOVERNING LAW</strong></p>
<p style="padding-left: 2rem;">This Contract shall be governed by the Labor Code of the Philippines and applicable laws.</p>
<br>
<p>IN WITNESS WHEREOF, the parties have hereunto set their hands this _____ day of _____________, 20___ in [City], Philippines.</p>
<br>
<br>
<table style="width: 100%;">
<tr>
<td style="width: 50%; text-align: center;">
<p>____________________________</p>
<p><strong>[EMPLOYER REPRESENTATIVE]</strong></p>
<p>EMPLOYER</p>
</td>
<td style="width: 50%; text-align: center;">
<p>____________________________</p>
<p><strong>[EMPLOYEE NAME]</strong></p>
<p>EMPLOYEE</p>
</td>
</tr>
</table>`
  },

  // Special Documents
  deed: {
    title: 'Deed of Sale',
    category: 'special',
    content: `<p style="text-align: center; font-weight: bold; text-decoration: underline;">DEED OF ABSOLUTE SALE</p>
<br>
<p>KNOW ALL MEN BY THESE PRESENTS:</p>
<br>
<p>This Deed of Absolute Sale is executed by and between:</p>
<br>
<p><strong>[SELLER NAME]</strong>, of legal age, Filipino, and with address at [ADDRESS], hereinafter referred to as the <strong>"SELLER"</strong>;</p>
<br>
<p>- and -</p>
<br>
<p><strong>[BUYER NAME]</strong>, of legal age, Filipino, and with address at [ADDRESS], hereinafter referred to as the <strong>"BUYER"</strong>;</p>
<br>
<p style="text-align: center; font-weight: bold;">WITNESSETH: That</p>
<br>
<p><strong>WHEREAS</strong>, the SELLER is the absolute and registered owner of [describe property];</p>
<br>
<p><strong>WHEREAS</strong>, the BUYER is desirous of purchasing the said property;</p>
<br>
<p><strong>NOW, THEREFORE</strong>, for and in consideration of the sum of [AMOUNT IN WORDS] (PHP [AMOUNT IN FIGURES]), receipt of which is hereby acknowledged, the SELLER hereby sells, transfers, and conveys unto the BUYER, his heirs, successors, and assigns, the above-described property, together with all improvements thereon.</p>
<br>
<p>The SELLER hereby warrants that:</p>
<p style="padding-left: 2rem;">1. He/She is the true and absolute owner of the property;</p>
<p style="padding-left: 2rem;">2. The property is free from all liens and encumbrances;</p>
<p style="padding-left: 2rem;">3. No other person has any right, title, or interest over the property.</p>
<br>
<p>IN WITNESS WHEREOF, the parties have hereunto set their hands this _____ day of _____________, 20___ in [City], Philippines.</p>
<br>
<br>
<table style="width: 100%;">
<tr>
<td style="width: 50%; text-align: center;">
<p>____________________________</p>
<p><strong>[SELLER NAME]</strong></p>
<p>SELLER</p>
</td>
<td style="width: 50%; text-align: center;">
<p>____________________________</p>
<p><strong>[BUYER NAME]</strong></p>
<p>BUYER</p>
</td>
</tr>
</table>
<br>
<p><strong>SIGNED IN THE PRESENCE OF:</strong></p>
<br>
<p>____________________________</p>
<p>[Witness 1 Name]</p>
<br>
<p>____________________________</p>
<p>[Witness 2 Name]</p>
<br>
<p><strong>ACKNOWLEDGMENT</strong></p>
<br>
<p>REPUBLIC OF THE PHILIPPINES )</p>
<p>[CITY/MUNICIPALITY] ) S.S.</p>
<br>
<p>BEFORE ME, a Notary Public, this _____ day of _____________, 20___, personally appeared:</p>
<br>
<p>[Seller name] - [ID type and number]</p>
<p>[Buyer name] - [ID type and number]</p>
<br>
<p>Known to me and to me known to be the same persons who executed the foregoing instrument and acknowledged to me that the same is their free and voluntary act and deed.</p>
<br>
<p>Doc. No. _____;</p>
<p>Page No. _____;</p>
<p>Book No. _____;</p>
<p>Series of 20___.</p>`
  },

  spa: {
    title: 'Special Power of Attorney',
    category: 'special',
    content: `<p style="text-align: center; font-weight: bold; text-decoration: underline;">SPECIAL POWER OF ATTORNEY</p>
<br>
<p>KNOW ALL MEN BY THESE PRESENTS:</p>
<br>
<p>I, <strong>[PRINCIPAL NAME]</strong>, of legal age, Filipino, and with address at [COMPLETE ADDRESS], do hereby name, constitute, and appoint <strong>[ATTORNEY-IN-FACT NAME]</strong>, of legal age, Filipino, and with address at [COMPLETE ADDRESS], to be my true and lawful attorney-in-fact, for me and in my name, place, and stead, to do and perform the following acts:</p>
<br>
<p style="padding-left: 2rem;">1. [Specify power granted, e.g., "To sell, transfer, and convey my property located at..."];</p>
<br>
<p style="padding-left: 2rem;">2. [Additional powers];</p>
<br>
<p style="padding-left: 2rem;">3. To execute, sign, seal, and deliver any and all documents, contracts, or instruments necessary to carry out the purposes herein set forth;</p>
<br>
<p style="padding-left: 2rem;">4. Generally, to do and perform all acts and things necessary or proper to be done in the premises, as fully and effectually as I might or could do if personally present.</p>
<br>
<p>I hereby ratify and confirm all that my said attorney-in-fact shall lawfully do or cause to be done by virtue of these presents.</p>
<br>
<p>This Special Power of Attorney shall remain in full force and effect until [DATE / "revoked in writing"].</p>
<br>
<p>IN WITNESS WHEREOF, I have hereunto set my hand this _____ day of _____________, 20___ in [City], Philippines.</p>
<br>
<br>
<p style="text-align: center;">____________________________</p>
<p style="text-align: center;"><strong>[PRINCIPAL NAME]</strong></p>
<p style="text-align: center;">PRINCIPAL</p>
<br>
<p><strong>SIGNED IN THE PRESENCE OF:</strong></p>
<br>
<p>____________________________</p>
<p>[Witness 1 Name]</p>
<br>
<p>____________________________</p>
<p>[Witness 2 Name]</p>
<br>
<p><strong>ACKNOWLEDGMENT</strong></p>
<br>
<p>REPUBLIC OF THE PHILIPPINES )</p>
<p>[CITY/MUNICIPALITY] ) S.S.</p>
<br>
<p>BEFORE ME, a Notary Public, this _____ day of _____________, 20___, personally appeared [PRINCIPAL NAME], with [ID type and number], known to me and to me known to be the same person who executed the foregoing instrument and acknowledged to me that the same is his/her free and voluntary act and deed.</p>
<br>
<p>Doc. No. _____;</p>
<p>Page No. _____;</p>
<p>Book No. _____;</p>
<p>Series of 20___.</p>`
  },

  resolution: {
    title: 'Board Resolution',
    category: 'special',
    content: `<p style="text-align: center; font-weight: bold;">[COMPANY NAME]</p>
<p style="text-align: center; font-weight: bold; text-decoration: underline;">BOARD RESOLUTION NO. _____</p>
<p style="text-align: center;">(Series of 20___)</p>
<br>
<p style="text-align: center; font-weight: bold;">RESOLUTION [SUBJECT]</p>
<br>
<p><strong>WHEREAS</strong>, [state the background or reason for the resolution];</p>
<br>
<p><strong>WHEREAS</strong>, [additional whereas clauses as needed];</p>
<br>
<p><strong>NOW, THEREFORE, BE IT RESOLVED</strong>, as it is hereby resolved by the Board of Directors of [COMPANY NAME] in a meeting duly called and held on [DATE], that:</p>
<br>
<p style="padding-left: 2rem;">1. [First resolution/action];</p>
<br>
<p style="padding-left: 2rem;">2. [Second resolution/action];</p>
<br>
<p style="padding-left: 2rem;">3. [Additional resolutions as needed].</p>
<br>
<p><strong>RESOLVED FURTHER</strong>, that [additional provisions or authorizations].</p>
<br>
<p>This resolution is hereby certified to have been duly adopted by the Board of Directors at a meeting held on [DATE], with the required quorum present.</p>
<br>
<p>ADOPTED this _____ day of _____________, 20___.</p>
<br>
<br>
<p style="text-align: center;">____________________________</p>
<p style="text-align: center;"><strong>[CORPORATE SECRETARY NAME]</strong></p>
<p style="text-align: center;">Corporate Secretary</p>
<br>
<p><strong>ATTESTED BY:</strong></p>
<br>
<p style="text-align: center;">____________________________</p>
<p style="text-align: center;"><strong>[PRESIDENT NAME]</strong></p>
<p style="text-align: center;">President</p>`
  }
};

// Export for use in document generator
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DOCUMENT_TEMPLATES;
}

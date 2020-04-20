# Document

### addToCoversheet

> `boolean` | optional

### additionalInfo

> `string` | optional

### additionalInfo2

> `string` | optional

### archived

> `boolean` | optional

### caseId


Unique ID of the associated Case.

> `string` | optional

### certificateOfService

> `boolean` | optional

### certificateOfServiceDate

> `any`


If `certificateOfService` = `true`, then this field is `date` and is `required.` 


Otherwise, this field is `any` and is `optional`.

### createdAt


When the Document was added to the system.

> `date` | required

### docketNumber


Docket Number of the associated Case in XXXXX-YY format.

> `string` | optional

##### Regex Pattern


`/^(\d{3,5}-\d{2})$/`

### documentContents

> `string` | optional

### documentId


ID of the associated PDF document in the S3 bucket.

> `string` | required

### documentTitle


The title of this document.

> `string` | optional

### documentType


The type of this document.

> `string` | required

##### Allowed Values


 - `Application for Waiver of Filing Fee`
 - `Ownership Disclosure Statement`
 - `Petition`
 - `Request for Place of Trial`
 - `Statement of Taxpayer Identification`
 - `Entry of Appearance`
 - `Substitution of Counsel`
 - `Answer`
 - `Answer to Amended Petition`
 - `Answer to Amended Petition, as Amended`
 - `Answer to Amendment to Amended Petition`
 - `Answer to Amendment to Petition`
 - `Answer to Petition, as Amended`
 - `Answer to Second Amended Petition`
 - `Answer to Second Amendment to Petition`
 - `Answer to Supplement to Petition`
 - `Answer to Third Amended Petition`
 - `Answer to Third Amendment to Petition`
 - `Designation of Counsel to Receive Service`
 - `Motion to Withdraw as Counsel`
 - `Motion to Withdraw Counsel (filed by petitioner)`
 - `Application for Waiver of Filing Fee and Affidavit`
 - `Application to Take Deposition`
 - `Agreed Computation for Entry of Decision`
 - `Computation for Entry of Decision`
 - `Proposed Stipulated Decision`
 - `Revised Computation`
 - `Administrative Record`
 - `Amended`
 - `Amended Certificate of Service`
 - `Amendment [anything]`
 - `Certificate as to the Genuineness of the Administrative Record`
 - `Certificate of Service`
 - `Civil Penalty Approval Form`
 - `Exhibit(s)`
 - `Memorandum`
 - `Partial Administrative Record`
 - `Ratification`
 - `Redacted`
 - `Report`
 - `Status Report`
 - `Motion for Continuance`
 - `Motion for Extension of Time`
 - `Motion to Dismiss for Lack of Jurisdiction`
 - `Motion to Dismiss for Lack of Prosecution`
 - `Motion for Summary Judgment`
 - `Motion to Change or Correct Caption`
 - `Motion for a New Trial`
 - `Motion for an Order under Federal Rule of Evidence 502(d)`
 - `Motion for an Order under Model Rule of Professional Conduct 4.2`
 - `Motion for Appointment of Mediator`
 - `Motion for Assignment of Judge`
 - `Motion for Audio of Trial Proceeding(s)`
 - `Motion for Certification of an Interlocutory Order to Permit Immediate Appeal`
 - `Motion for Default and Dismissal`
 - `Motion for Entry of Decision`
 - `Motion for Entry of Order that Undenied Allegations be Deemed Admitted Pursuant to Rule 37(c)`
 - `Motion for Estate Tax Deduction Developing at or after Trial Pursuant to Rule 156`
 - `Motion for in Camera Review`
 - `Motion for International Judicial Assistance`
 - `Motion for Judgment on the Pleadings`
 - `Motion for Leave to Conduct Discovery Pursuant to Rule 70(a)(2)`
 - `Motion for Leave to File`
 - `Motion for Leave to File Out of Time`
 - `Motion for Leave to Serve Additional Interrogatories`
 - `Motion for Leave to Use Electronic Equipment`
 - `Motion for More Definite Statement Pursuant to Rule 51`
 - `Motion for Non-Binding Mediation`
 - `Motion for Oral Argument`
 - `Motion for Order Fixing Amount of an Appeal Bond`
 - `Motion for Order to Release the Amount of an Appeal Bond`
 - `Motion for Order to Show Cause Why Case Should Not Be Sumitted on the Basis of the Administrative Record`
 - `Motion for Order to Show Cause Why Judgment Should Not be Entered on the Basis of a Previously Decided Case`
 - `Motion for Order to Show Cause Why Proposed Facts and Evidence Should Not be Accepted as Established Pursuant to Rule 91(f)`
 - `Motion for Partial Summary Judgment`
 - `Motion for Pretrial Conference`
 - `Motion for Protective Order Pursuant to Rule 103`
 - `Motion for Reasonable Litigation or Administrative Costs`
 - `Motion for Reconsideration of Findings or Opinion Pursuant to Rule 161`
 - `Motion for Reconsideration of Order`
 - `Motion for Recusal of Judge`
 - `Motion for Review of Jeopardy Assessment or Jeopardy Levy Pursuant to Rule 56`
 - `Motion for the Court to Pay the Expenses of a Transcript`
 - `Motion for the Court to Pay the Expenses of an Interpreter`
 - `Motion for Voluntary Binding Arbitration`
 - `Motion for Writ of Habeas Corpus Ad Testificandum`
 - `Motion in Limine`
 - `Motion to Add Lien or Levy Designation`
 - `Motion to Add Small Tax case Designation`
 - `Motion to Amend Order`
 - `Motion to Appoint an Interpreter Pursuant to Rule 143(f)`
 - `Motion to Appoint New Tax Matters Partner`
 - `Motion to Appoint Tax Matters Partner`
 - `Motion to Authorize Proposed Sale of Seized Property`
 - `Motion to Be Excused from Appearing at the Trial Session`
 - `Motion to Be Recognized as Next Friend`
 - `Motion to Bifurcate`
 - `Motion to Calendar`
 - `Motion to Calendar and Consolidate`
 - `Motion to Calendar in the Electronic (North) Courtroom`
 - `Motion to Certify for Interlocutory Appeal`
 - `Motion to Change or Correct Docket Entry`
 - `Motion to Change Place of Submission of Declaratory Judgment Case`
 - `Motion to Change Place of Trial`
 - `Motion to Change Service Method`
 - `Motion to Clarify Order`
 - `Motion to Close on Ground of Duplication`
 - `Motion to Compel Discovery`
 - `Motion to Compel Production of Documents`
 - `Motion to Compel Responses to Interrogatories`
 - `Motion to Compel the Taking of Deposition`
 - `Motion to Conform the Pleadings to the Proof`
 - `Motion to Consolidate`
 - `Motion to Correct and Certify Record on Appeal`
 - `Motion to Correct Clerical Order`
 - `Motion to Correct Transcript`
 - `Motion to Depose Pursuant to Rule 74`
 - `Motion to Determine the Tax Matters Partner`
 - `Motion to Dismiss`
 - `Motion to Dismiss for Failure to Properly Prosecute`
 - `Motion to Dismiss for Failure to State a Claim upon Which Relief Can Be Granted`
 - `Motion to Dismiss for Lack of Jurisdiction as to [person, notice, or year]`
 - `Motion to Dismiss on Grounds of Mootness`
 - `Motion to Disqualify Counsel`
 - `Motion to Enforce a Refund of Overpayment Pursuant to Rule 260`
 - `Motion to Enforce Subpoena`
 - `Motion to Extend Time to Move or File Answer`
 - `Motion to Impose a Penalty`
 - `Motion to Impose Sanctions`
 - `Motion to Modify Decision in Estate Tax Case Pursuant to Rule 262`
 - `Motion to Modify Order`
 - `Motion to Permit Expert Witness to Testify without a Written Report Regarding Industry Practice Pursuant to Rule 143(g)(3)`
 - `Motion to Permit Levy`
 - `Motion to Preclude`
 - `Motion to Quash or Modify Subpoena`
 - `Motion to Redetermine Interest Pursuant to Rule 261`
 - `Motion to Remand`
 - `Motion to Remove Lien/Levy Designation`
 - `Motion to Remove Small Tax Case Designation`
 - `Motion to Remove Tax Matters Partner`
 - `Motion to Reopen the Record`
 - `Motion to Require Petitioner to File a Reply in a Small Tax Case Pursuant to Rule 173(c)`
 - `Motion to Restore Case to the General Docket`
 - `Motion to Restrain Assessment or Collection or to Order Refund of Amount Collected`
 - `Motion to Retain File in Estate Tax Case Involving § 6166 Election Pursuant to Rule 157`
 - `Motion to Review the Sufficiency of Answers or Objections to Request for Admissions`
 - `Motion to Seal`
 - `Motion to Set for a Time & Date Certain`
 - `Motion to Set Pretrial Scheduling Order`
 - `Motion to Sever`
 - `Motion to Shift the Burden of Proof`
 - `Motion to Shorten the Time`
 - `Motion to Stay Proceedings`
 - `Motion to Stay Proposed Sale of Seized Property`
 - `Motion to Strike`
 - `Motion to Submit Case Pursuant to Rule 122`
 - `Motion to Substitute Parties and Change Caption`
 - `Motion to Substitute Trial Exhibit(s)`
 - `Motion to Supplement the Record`
 - `Motion to Suppress Evidence`
 - `Motion to Take Deposition Pursuant to Rule 74(c)(3)`
 - `Motion to Take Judicial Notice`
 - `Motion to Vacate`
 - `Motion to Vacate or Revise Pursuant to Rule 162`
 - `Motion to Withdraw`
 - `Motion to Withdraw or Modify the Deemed Admitted Admissions Pursuant to Rule 90(f)`
 - `Notice of Abatement of Jeopardy Assessment`
 - `Notice of Appeal`
 - `Notice of Change of Address`
 - `Notice of Change of Address and Telephone Number`
 - `Notice of Change of Telephone Number`
 - `Notice of Clarification of Tax Matters Partner`
 - `Notice of Concession`
 - `Notice of Consistent Agreement Pursuant to Rule 248(c)(1)`
 - `Notice of Death of Counsel`
 - `Notice of Filing of Petition and Right to Intervene`
 - `Notice of Filing of the Administrative Record`
 - `Notice of Identification of Tax Matters Partner`
 - `Notice of Intent Not to File`
 - `Notice of Issue Concerning Foreign Law`
 - `Notice of Jeopardy Assessment`
 - `Notice of Judicial Ruling`
 - `Notice of No Objection`
 - `Notice of Objection`
 - `Notice of Partial Abatement of Jeopardy Assessment`
 - `Notice of Proceeding in Bankruptcy`
 - `Notice of Relevant Judicial Decisions`
 - `Notice of Settlement Agreement Pursuant to Rule 248(c)(1)`
 - `Notice of Small Tax Case Election`
 - `Notice of Supplemental Authority`
 - `Notice of Telephone Number`
 - `Notice of Termination Assessment`
 - `Notice of Unavailability`
 - `Redacted Petition Filed`
 - `Prehearing Memorandum`
 - `Pretrial Memorandum`
 - `Reply`
 - `Sur-Reply`
 - `Request for Admissions`
 - `Request for Judicial Notice`
 - `Request for Pretrial Conference`
 - `No Objection`
 - `Objection`
 - `Opposition`
 - `Response`
 - `Seriatim Answering Brief`
 - `Seriatim Answering Memorandum Brief`
 - `Seriatim Opening Brief`
 - `Seriatim Opening Memorandum Brief`
 - `Seriatim Reply Brief`
 - `Seriatim Reply Memorandum Brief`
 - `Seriatim Sur-Reply Brief`
 - `Seriatim Sur-Reply Memorandum Brief`
 - `Simultaneous Answering Brief`
 - `Simultaneous Answering Memoranda of Law`
 - `Simultaneous Answering Memorandum Brief`
 - `Simultaneous Memoranda of Law`
 - `Simultaneous Opening Brief`
 - `Simultaneous Opening Memorandum Brief`
 - `Simultaneous Reply Brief`
 - `Simultaneous Supplemental Brief`
 - `Simultaneous Sur-Reply Brief`
 - `Simultaneous Sur-Reply Memorandum Brief`
 - `Statement`
 - `Statement of Redacted Information`
 - `Statement under Rule 212`
 - `Statement under Rule 50(c)`
 - `Settlement Stipulation`
 - `Stipulation`
 - `Stipulation as to the Administrative Record`
 - `Stipulation as to the Partial Administrative Record`
 - `Stipulation of Facts`
 - `Stipulation of Pretrial Deadlines`
 - `Stipulation of Settled Issues`
 - `Stipulation of Settlement`
 - `Stipulation to Be Bound`
 - `Stipulation to Take Deposition`
 - `Supplement`
 - `Supplemental`
 - `Affidavit in Support`
 - `Brief in Support`
 - `Declaration in Support`
 - `Memorandum in Support`
 - `Unsworn Declaration under Penalty of Perjury in Support`
 - `Application`
 - `Application for Examination Pursuant to Rule 73`
 - `Amended [Document Name]`
 - `Appellate Filing Fee Received`
 - `Bond`
 - `Bounced Electronic Service`
 - `Evidence`
 - `Hearing Exhibits`
 - `Letter`
 - `Miscellaneous`
 - `Miscellaneous (Lodged)`
 - `Reference List of Redacted Information`
 - `Returned Mail`
 - `Trial Exhibits`
 - `U.S.C.A. [Anything]`
 - `Motion`
 - `Motion for Review By the Full Court`
 - `Motion for Review En Banc`
 - `Motion to Be Exempt from E-Filing`
 - `Motion to Change Place of Hearing of Disclosure Case`
 - `Motion to File Document Under Seal`
 - `Motion to Intervene`
 - `Motion to Proceed Anonymously`
 - `Notice`
 - `Notice of Change of Counsel for Non-Party`
 - `Notice of Election to Intervene`
 - `Notice of Election to Participate`
 - `Notice of Intervention`
 - `Ratification of Petition`
 - `Request`
 - `Objection [anything]`
 - `Opposition [anything]`
 - `Response [anything]`
 - `Supplement To [anything]`
 - `Supplemental [anything]`
 - `Order`
 - `Order of Dismissal for Lack of Jurisdiction`
 - `Order of Dismissal`
 - `Order of Dismissal and Decision`
 - `Order to Show Cause`
 - `Order and Decision`
 - `Decision`
 - `O - Order`
 - `OAJ - Order that case is assigned`
 - `OAL - Order that the letter "L" is added to Docket number`
 - `OAP - Order for Amended Petition`
 - `OAPF - Order for Amended Petition and Filing Fee`
 - `OAR - Order that the letter "R" is added to the Docket number`
 - `OAS - Order that the letter "S" is added to the Docket number`
 - `OASL - Order that the letters "SL" are added to the Docket number`
 - `OAW - Order that the letter "W" is added to the Docket number`
 - `OAX - Order that the letter "X" is added to the Docket number`
 - `OCA - Order that caption of case is amended`
 - `OD - Order of Dismissal Entered,`
 - `ODD - Order of Dismissal and Decision Entered,`
 - `ODL - Order that the letter "L" is deleted from the Docket number`
 - `ODP - Order that the letter "P" is deleted from the Docket number`
 - `ODR - Order that the letter "R" is deleted from the Docket number`
 - `ODS - Order that the letter "S" is deleted from the Docket number`
 - `ODSL - Order that the letters "SL" are deleted from the Docket number`
 - `ODW - Order that the letter "W" is deleted from the Docket number`
 - `ODX - Order that the letter "X" is deleted from the Docket number`
 - `OF - Order for Filing Fee`
 - `OFAB - Order fixing amount of bond`
 - `OFFX - Order time is extended for petr(s) to pay the filing fee`
 - `OFWD - Order for Filing Fee. Application waiver of Filing Fee is denied.`
 - `OFX - Order time is extended for petr(s) to pay filing fee or submit an Application for Waiver of Filing fee`
 - `OIP - Order that the letter "P" is added to the Docket number`
 - `OJR - Order that jurisdiction is retained`
 - `OODS - Order for Ownership Disclosure Statement`
 - `OPFX - Order time is extended for petr(s) to file Amended Petition and pay the Filing Fee or submit an Application for Waiver of Filing Fee`
 - `OPX - Order time is extended for petr(s) to file Amended Petition`
 - `ORAP - Order for Amendment to Petition`
 - `OROP - Order for Ratification of Petition`
 - `OSC - Order`
 - `OSCP - Order petr(s) to show cause why "S" should not be removed`
 - `OST - Order of Service of Transcript (Bench Opinion)`
 - `OSUB - Order that case is submitted`
 - `DEC - Decision Entered,`
 - `OAD - Order and Decision Entered,`
 - `ODJ - Order of Dismissal for Lack of Jurisdiction Entered,`
 - `SDEC - Stipulated Decision Entered,`
 - `MOP - Memorandum Opinion`
 - `NOT - Notice`
 - `Summary Opinion`
 - `Writ of Habeas Corpus Ad Testificandum`
 - `CTRA - Corrected Transcript`
 - `FTRL - Further Trial before ...`
 - `HEAR - Hearing before ...`
 - `NTD - Notice of Trial`
 - `PTRL - Partial Trial before ...`
 - `TRL - Trial before ...`
 - `ROA - Record on Appeal`
 - `TCOP - T.C. Opinion`
 - `RTRA - Revised Transcript`
 - `TRAN - Transcript`
 - `SPTO - Standing Pre-Trial Order`
 - `MISC - Miscellaneous`
 - `Stipulated Decision`
 - `Notice of Docket Change`
 - `Notice of Trial`
 - `Standing Pretrial Notice`
 - `Standing Pretrial Order`

### draftState

> `object` | optional

##### Can be null.

### eventCode

> `string` | optional

### filedBy

> `string` | optional

##### Can be .

### filingDate


Date that this Document was filed.

> `date` | required

### freeText

> `string` | optional

### freeText2

> `string` | optional

### hasSupportingDocuments

> `boolean` | optional

### isFileAttached

> `boolean` | optional

### isPaper

> `boolean` | optional

### judge


The judge associated with the document.

> `string` | optional

##### Can be null.

### lodged


A lodged document is awaiting action by the judge to enact or refuse.

> `boolean` | optional

### objections

> `string` | optional

### ordinalValue

> `string` | optional

### partyIrsPractitioner

> `boolean` | optional

### partyPrimary

> `boolean` | optional

### partySecondary

> `boolean` | optional

### pending

> `boolean` | optional

### previousDocument

> `object` | optional

### privatePractitioners

> `array` | optional

### processingStatus

> `string` | optional

### qcAt

> `date` | optional

### qcByUser

> `object` | optional

### qcByUserId

> `string` | optional

##### Can be null.

### receivedAt

> `date` | optional

### relationship

> `string` | optional

### scenario

> `string` | optional

### secondaryDate


A secondary date associated with the document, typically related to time-restricted availability.

> `date` | optional

### secondaryDocument

> `object` | optional

### servedAt

> `date` | optional

### servedParties

> `array` | optional

### serviceDate

> `date` | optional

##### Can be null.

### serviceStamp

> `string` | optional

### signedAt

> `date` | optional

##### Can be null.

### signedByUserId

> `string` | optional

##### Can be null.

### signedJudgeName

> `string` | optional

##### Can be null.

### status

> `string` | optional

##### Can be served.

### supportingDocument

> `string` | optional

##### Can be null.

### trialLocation

> `conditional` | optional


*Must match 1 of the following conditions:*

#### Condition #1 for `trialLocation`: 

> `string`

##### Allowed Values


 - `Fresno, California`
 - `Tallahassee, Florida`
 - `Pocatello, Idaho`
 - `Peoria, Illinois`
 - `Wichita, Kansas`
 - `Shreveport, Louisiana`
 - `Portland, Maine`
 - `Billings, Montana`
 - `Albany, New York`
 - `Syracuse, New York`
 - `Bismarck, North Dakota`
 - `Aberdeen, South Dakota`
 - `Burlington, Vermont`
 - `Roanoke, Virginia`
 - `Cheyenne, Wyoming`
 - `Birmingham, Alabama`
 - `Mobile, Alabama`
 - `Anchorage, Alaska`
 - `Phoenix, Arizona`
 - `Little Rock, Arkansas`
 - `Los Angeles, California`
 - `San Diego, California`
 - `San Francisco, California`
 - `Denver, Colorado`
 - `Hartford, Connecticut`
 - `Washington, District of Columbia`
 - `Jacksonville, Florida`
 - `Miami, Florida`
 - `Tampa, Florida`
 - `Atlanta, Georgia`
 - `Honolulu, Hawaii`
 - `Boise, Idaho`
 - `Chicago, Illinois`
 - `Indianapolis, Indiana`
 - `Des Moines, Iowa`
 - `Louisville, Kentucky`
 - `New Orleans, Louisiana`
 - `Baltimore, Maryland`
 - `Boston, Massachusetts`
 - `Detroit, Michigan`
 - `St. Paul, Minnesota`
 - `Jackson, Mississippi`
 - `Kansas City, Missouri`
 - `St. Louis, Missouri`
 - `Helena, Montana`
 - `Omaha, Nebraska`
 - `Las Vegas, Nevada`
 - `Reno, Nevada`
 - `Albuquerque, New Mexico`
 - `Buffalo, New York`
 - `New York City, New York`
 - `Winston-Salem, North Carolina`
 - `Cincinnati, Ohio`
 - `Cleveland, Ohio`
 - `Columbus, Ohio`
 - `Oklahoma City, Oklahoma`
 - `Portland, Oregon`
 - `Philadelphia, Pennsylvania`
 - `Pittsburgh, Pennsylvania`
 - `Columbia, South Carolina`
 - `Knoxville, Tennessee`
 - `Memphis, Tennessee`
 - `Nashville, Tennessee`
 - `Dallas, Texas`
 - `El Paso, Texas`
 - `Houston, Texas`
 - `Lubbock, Texas`
 - `San Antonio, Texas`
 - `Salt Lake City, Utah`
 - `Richmond, Virginia`
 - `Seattle, Washington`
 - `Spokane, Washington`
 - `Charleston, West Virginia`
 - `Milwaukee, Wisconsin`

#### Condition #2 for `trialLocation`: 

> `string`

##### Regex Pattern


`/^[a-zA-Z ]+, [a-zA-Z ]+, [0-9]+$/`

#### Condition #3 for `trialLocation`: 

> `string`

##### Can be null.

### userId

> `string` | required

### workItems

> `array` | optional

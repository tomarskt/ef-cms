# DocketRecord

### action


Action taken in response to this Docket Record item.

> `string` | optional

##### Can be null.

### description


Text that describes this Docket Record item, which may be part of the Filings and Proceedings value.

> `string` | required

### documentId


ID of the associated PDF document in the S3 bucket.

> `string` | optional

##### Can be null.

### editState


JSON representation of the in-progress edit of this item.


Restricted

> `string` | optional

##### Can be null.

### eventCode


Code associated with the event that resulted in this item being added to the Docket Record.

> `string` | required

##### Allowed Values


 - `A`
 - `AAAP`
 - `AAPN`
 - `AATP`
 - `AATS`
 - `AATT`
 - `ACED`
 - `ADMR`
 - `ADMT`
 - `AFE`
 - `AFF`
 - `AMAT`
 - `AMDC`
 - `APA`
 - `APLD`
 - `APPL`
 - `APPW`
 - `APW`
 - `ASAP`
 - `ASUP`
 - `ATAP`
 - `ATSP`
 - `BND`
 - `BRF`
 - `CERT`
 - `CIVP`
 - `COED`
 - `CS`
 - `CTRA`
 - `DCL`
 - `DEC`
 - `DISC`
 - `DSC`
 - `EA`
 - `ES`
 - `EVID`
 - `EXH`
 - `FEE`
 - `FEEW`
 - `FTRL`
 - `HE`
 - `HEAR`
 - `LTR`
 - `M000`
 - `M001`
 - `M002`
 - `M003`
 - `M004`
 - `M005`
 - `M006`
 - `M007`
 - `M008`
 - `M009`
 - `M010`
 - `M011`
 - `M012`
 - `M013`
 - `M014`
 - `M015`
 - `M016`
 - `M017`
 - `M018`
 - `M019`
 - `M020`
 - `M021`
 - `M022`
 - `M023`
 - `M024`
 - `M026`
 - `M027`
 - `M028`
 - `M029`
 - `M030`
 - `M031`
 - `M032`
 - `M033`
 - `M034`
 - `M035`
 - `M036`
 - `M037`
 - `M038`
 - `M039`
 - `M040`
 - `M041`
 - `M042`
 - `M043`
 - `M044`
 - `M045`
 - `M046`
 - `M047`
 - `M048`
 - `M049`
 - `M050`
 - `M051`
 - `M052`
 - `M053`
 - `M054`
 - `M055`
 - `M056`
 - `M057`
 - `M058`
 - `M059`
 - `M060`
 - `M061`
 - `M062`
 - `M063`
 - `M064`
 - `M065`
 - `M066`
 - `M067`
 - `M068`
 - `M069`
 - `M070`
 - `M071`
 - `M072`
 - `M073`
 - `M074`
 - `M075`
 - `M076`
 - `M077`
 - `M078`
 - `M079`
 - `M080`
 - `M081`
 - `M082`
 - `M083`
 - `M084`
 - `M085`
 - `M086`
 - `M087`
 - `M088`
 - `M089`
 - `M090`
 - `M091`
 - `M092`
 - `M093`
 - `M094`
 - `M095`
 - `M096`
 - `M097`
 - `M098`
 - `M099`
 - `M100`
 - `M101`
 - `M102`
 - `M103`
 - `M104`
 - `M105`
 - `M106`
 - `M107`
 - `M108`
 - `M109`
 - `M110`
 - `M111`
 - `M112`
 - `M113`
 - `M114`
 - `M115`
 - `M116`
 - `M117`
 - `M118`
 - `M119`
 - `M120`
 - `M121`
 - `M122`
 - `M123`
 - `M124`
 - `M125`
 - `M126`
 - `M129`
 - `M130`
 - `M131`
 - `M132`
 - `M133`
 - `M134`
 - `M135`
 - `M136`
 - `M218`
 - `MEMO`
 - `MGRTED`
 - `MINC`
 - `MIND`
 - `MISC`
 - `MISCL`
 - `MISL`
 - `MISP`
 - `MOP`
 - `NAJA`
 - `NCA`
 - `NCAG`
 - `NCAP`
 - `NCNP`
 - `NCON`
 - `NCP`
 - `NCTP`
 - `NDC`
 - `NDT`
 - `NFAR`
 - `NIFL`
 - `NINF`
 - `NIS`
 - `NITM`
 - `NJAR`
 - `NNOB`
 - `NOA`
 - `NOB`
 - `NODC`
 - `NOEI`
 - `NOEP`
 - `NOI`
 - `NOST`
 - `NOT`
 - `NOU`
 - `NPB`
 - `NPJR`
 - `NRJD`
 - `NRJR`
 - `NSA`
 - `NSTE`
 - `NTA`
 - `NTD`
 - `NTN`
 - `O`
 - `OAD`
 - `OAJ`
 - `OAL`
 - `OAP`
 - `OAPF`
 - `OAR`
 - `OAS`
 - `OASL`
 - `OAW`
 - `OAX`
 - `OBJ`
 - `OBJE`
 - `OBJN`
 - `OCA`
 - `OD`
 - `ODD`
 - `ODJ`
 - `ODL`
 - `ODP`
 - `ODR`
 - `ODS`
 - `ODSL`
 - `ODW`
 - `ODX`
 - `OF`
 - `OFAB`
 - `OFFX`
 - `OFWD`
 - `OFX`
 - `OIP`
 - `OJR`
 - `OODS`
 - `OP`
 - `OPFX`
 - `OPPO`
 - `OPX`
 - `ORAP`
 - `OROP`
 - `OSC`
 - `OSCP`
 - `OST`
 - `OSUB`
 - `P`
 - `PARD`
 - `PHM`
 - `PMT`
 - `PSDE`
 - `PTFR`
 - `PTRL`
 - `RAT`
 - `RATF`
 - `RCOM`
 - `REDC`
 - `REPL`
 - `REQ`
 - `REQA`
 - `RESP`
 - `RFPC`
 - `RJN`
 - `RLRI`
 - `RM`
 - `ROA`
 - `RPT`
 - `RQT`
 - `RSP`
 - `RTP`
 - `RTRA`
 - `S212`
 - `SADM`
 - `SAMB`
 - `SATL`
 - `SDEC`
 - `SEAB`
 - `SEOB`
 - `SERB`
 - `SESB`
 - `SIAB`
 - `SIAM`
 - `SIMB`
 - `SIML`
 - `SIOB`
 - `SIOM`
 - `SIRB`
 - `SISB`
 - `SOC`
 - `SOMB`
 - `SOP`
 - `SORI`
 - `SPAR`
 - `SPD`
 - `SPML`
 - `SPMT`
 - `SPTN`
 - `SPTO`
 - `SRMB`
 - `SSB`
 - `SSRB`
 - `SSRM`
 - `SSTP`
 - `STAR`
 - `STAT`
 - `STBB`
 - `STIN`
 - `STIP`
 - `STP`
 - `STPD`
 - `STS`
 - `STST`
 - `SUPM`
 - `SURP`
 - `Standard`
 - `TCOP`
 - `TE`
 - `TRAN`
 - `TRL`
 - `USCA`
 - `USDL`
 - `WRIT`

### filedBy


ID of the user that filed this Docket Record item.


Restricted

> `string` | optional

##### Can be null.

### filingDate


Date that this Docket Record item was filed.

> `date` | required

### index


Index of this item in the Docket Record list.

> `number` | required

### servedPartiesCode


Served parties code to override system-computed code.

> `string` | optional

##### Can be null.

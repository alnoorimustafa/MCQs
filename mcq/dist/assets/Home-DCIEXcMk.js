import{d as L,i as H,r as k,c as R,o as U,a as l,b as s,e as a,F as B,f as I,t as w,g,n as G,_ as Q,w as N,v as Y,h as j,u,j as x,k as T,l as X,T as J}from"./index-CrS8XUdG.js";const K="/assets/1200-DVlGU8Vs.webp",Z="/assets/501-Bjv-yp59.webp",W="/assets/600-1-0j3TdL2g.webp",ee="/assets/600-2-97LUNhQf.webp",ae="/assets/bof1-DO85Xb_Y.webp",le="/assets/bof2-BnUsYsFl.webp",te="/assets/bof3-CBVzHEFc.webp",se="/assets/flag-CQhQGjVs.webp",oe="/assets/focus-p9ABiVhh.webp",re="/assets/ghazi-DJab20xm.webp",ie="/assets/gt1-JxKh0IgB.webp",ne="/assets/gt2-BPySXylE.webp",ce="/assets/gt3-ALwx4Lof.webp",ue="/assets/pretest-7bj1kfbQ.webp",pe="/assets/prite-CjU4Lftm.webp",de="/assets/spmm-k-Am_ueg.webp",ve="/assets/flag-CQhQGjVs.webp",he="/assets/bof1-DO85Xb_Y.webp",ye="/assets/bof2-BnUsYsFl.webp",be="/assets/bof3-CBVzHEFc.webp",ge="/assets/600-1-0j3TdL2g.webp",Ce="/assets/600-2-97LUNhQf.webp",me="/assets/1200-DVlGU8Vs.webp",Pe="/assets/spmm-k-Am_ueg.webp",fe="/assets/gt1-JxKh0IgB.webp",_e="/assets/gt2-BPySXylE.webp",ke="/assets/gt3-ALwx4Lof.webp",we="/assets/pretest-7bj1kfbQ.webp",Se="/assets/focus-p9ABiVhh.webp",Ae="/assets/501-Bjv-yp59.webp",Oe="/assets/ghazi-DJab20xm.webp";function Ee(E,n={}){typeof window.gtag=="function"?window.gtag("event",E,n):console.error("Google Analytics is not initialized.")}const De={class:"container"},$e={id:"app"},Be={class:"questions-container"},Ie={class:"question-image"},Re=["src"],Ne={class:"question-text"},Te={class:"options-list"},Le=["onClick","disabled"],He={key:0},Me={class:"explanation"},Ye=["aria-busy","onClick"],Ge={class:"score-bar"},Qe={class:"flex-1"},ze={class:"toHide"},Fe={class:"toHide2"},Ue={class:"margin-2"},xe={class:"margin-2"},qe={class:"margin-2"},Ve={class:"flex-2"},je=["aria-busy"],Xe={key:0},Je=["aria-busy"],Ke={key:0},Ze=L({__name:"ChapterMCQs",props:["questionsData","selectedChapter","selectedBook"],setup(E){const n=H("pb"),i=E,p=k(i.questionsData),v=k(Array(p.value.length).fill(null)),A=k(0),c=k(0),o=k(!1),f=k([]),h=k(!1),_=k(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",m=>{_.value=m.matches});const e=async()=>{var m;o.value=!0;try{const r=await n.collection("progress").getFirstListItem(`user = "${(m=n.authStore.record)==null?void 0:m.id}" && book = "${i.selectedBook}" && chapter = "${i.selectedChapter}"`);r!=null&&r.answered&&(v.value=p.value.map(y=>{const d=r.answered.find(S=>S.questionId===y.id);return d&&(y.showCorrectAnswer=d.showCorrectAnswer),(d==null?void 0:d.selectedOption)||null}),A.value=r.right||0,c.value=r.wrong||0)}catch(r){console.log("No progress found for this chapter:",r)}o.value=!1},t=async()=>{var y,d;o.value=!0;const m=p.value.map((S,P)=>({questionId:S.id,selectedOption:v.value[P],showCorrectAnswer:S.showCorrectAnswer||!1})),r={user:(y=n.authStore.record)==null?void 0:y.id,chapter:i.selectedChapter,book:i.selectedBook,answered:m,right:A.value,wrong:c.value};try{const S=await n.collection("progress").getFirstListItem(`user = "${(d=n.authStore.record)==null?void 0:d.id}" && book = "${i.selectedBook}" && chapter = "${i.selectedChapter}"`);S&&await n.collection("progress").update(S.id,r)}catch{await n.collection("progress").create(r)}o.value=!1},b=async(m,r,y,d)=>{v.value[m]===null&&(v.value[m]=y,r===d?A.value+=1:(c.value+=1,p.value[m].showCorrectAnswer=!0))},C=async()=>{var m,r,y,d,S;try{const P=await n.collection("flags").getFirstListItem(`user.id="${(m=n.authStore.record)==null?void 0:m.id}"`,{expand:"mcqs"});if(!P||!((r=P.expand)!=null&&r.mcqs))throw new Error("No flagged questions found");let M=(y=P.expand)==null?void 0:y.mcqs.filter(F=>F.book===i.selectedBook&&F.chapter===i.selectedChapter);return M&&M[0]?(f.value=M,{id:P.id,count:(d=P.expand)==null?void 0:d.mcqs.length}):{id:P.id,count:(S=P.expand)==null?void 0:S.mcqs.length}}catch(P){console.log("No flagged questions found for this chapter:",P)}},O=async(m,r)=>{var y;if(n.authStore.record){h.value=!0;try{const d=await C();if(!(d!=null&&d.id)){const P=await n.collection("flags").create({user:(y=n.authStore.record)==null?void 0:y.id,mcqs:[m]});f.value.push(p.value[r]);return}f.value.some(P=>P.id===m)?d.count>1?(await n.collection("flags").update(d.id,{"mcqs-":m}),f.value=f.value.filter(P=>P.id!==m)):(await n.collection("flags").delete(d.id),f.value=f.value.filter(P=>P.id!==m)):(await n.collection("flags").update(d.id,{"mcqs+":m}),f.value.push(p.value[r]))}catch(d){console.error("Error in toggling flag:",d)}h.value=!1}},D=()=>{const m=p.value.map((r,y)=>({question:r,selectedOption:v.value[y]}));m.sort(()=>Math.random()-.5),p.value=m.map(r=>r.question),v.value=m.map(r=>r.selectedOption)},$=R(()=>A.value/p.value.length*100),z=R(()=>p.value.length),q=R(()=>A.value),V=R(()=>c.value);return U(()=>{C()}),(m,r)=>(l(),s("div",{class:G({dark:_.value})},[a("div",De,[a("div",$e,[a("div",Be,[(l(!0),s(B,null,I(p.value,(y,d)=>(l(),s("div",{key:d,class:"question-card"},[a("div",Ie,[y.image?(l(),s("img",{key:0,src:`https://mcq-db.dakakean.com/api/files/mcqs/${y.id}/${y.image}`,alt:""},null,8,Re)):g("",!0)]),a("p",Ne,w(d+1)+" - "+w(y.question),1),a("ul",Te,[(l(!0),s(B,null,I(y.options,(S,P)=>(l(),s("li",{key:P,class:G(["option",{"correct-option":P===y.correct_answer&&(v.value[d]===S||y.showCorrectAnswer),"incorrect-option":v.value[d]&&P!==y.correct_answer&&v.value[d]===S}]),onClick:M=>b(d,P,S,y.correct_answer),disabled:v.value[d]!==null},w(P)+". "+w(S),11,Le))),128))]),v.value[d]!==null&&y.explanation&&["bof1","bof2","bof3","gt1","gt2","gt3"].includes(E.selectedBook)?(l(),s("details",He,[r[0]||(r[0]=a("summary",{role:"button",class:"outline secondary"}," Explanation ",-1)),a("p",Me,w(y.explanation),1)])):g("",!0),y.showCorrectAnswer?(l(),s("button",{key:1,"aria-busy":h.value,class:G(f.value.some(S=>S.id===y.id)?"unflag":"flag"),onClick:S=>O(y.id,d)},w(h.value?"    ":f.value.some(S=>S.id===y.id)?"unflag":"flag"),11,Ye)):g("",!0)]))),128))])])]),r[8]||(r[8]=a("p",{class:"end"},"End of MCQs",-1)),a("div",Ge,[a("div",Qe,[a("div",ze,[a("span",null,w(z.value)+" MCQ",1)]),r[4]||(r[4]=a("span",{class:"toHide"}," | ",-1)),a("div",Fe,[r[1]||(r[1]=a("i",{class:"fa-solid fa-square-poll-vertical"},null,-1)),a("span",Ue,w($.value.toFixed(0))+"/100",1)]),r[5]||(r[5]=a("span",{class:"toHide2"}," | ",-1)),a("div",null,[r[2]||(r[2]=a("i",{class:"fa-solid fa-square-check"},null,-1)),a("span",xe,w(q.value),1)]),r[6]||(r[6]=a("span",null," | ",-1)),a("div",null,[r[3]||(r[3]=a("i",{class:"fa-solid fa-square-xmark"},null,-1)),a("span",qe,w(V.value),1)]),r[7]||(r[7]=a("span",null," | ",-1))]),a("div",Ve,[a("button",{"aria-busy":o.value,class:"save",onClick:t},[o.value?g("",!0):(l(),s("span",Xe," Save "))],8,je),a("button",{"aria-busy":o.value,class:"load",onClick:e},[o.value?g("",!0):(l(),s("span",Ke,"Load "))],8,Je),a("button",{class:"randomize",onClick:D},"Randomize")])])],2))}}),We=Q(Ze,[["__scopeId","data-v-616ae242"]]),ea={class:"container"},aa={id:"app"},la={class:"questions-container"},ta={class:"question-text"},sa=["onUpdate:modelValue"],oa={class:"options-list"},ra=["onUpdate:modelValue"],ia=["onUpdate:modelValue"],na=["onClick"],ca={class:"answers"},ua=["onUpdate:modelValue"],pa={class:"score-bar"},da={class:"flex-1"},va=["aria-busy"],ha={key:0},ya=L({__name:"Edit",props:["questionsData"],setup(E){const n=H("pb"),p=k(E.questionsData),v=k(!1),A=async()=>{v.value=!0;try{for(const o of p.value)await n.collection("mcqs").update(o.id,{...o,explanation:o.explanation,correct_answer:o.correct_answer,question:o.question}),console.log("saved question")}catch(o){console.log("Error saving explanations"),console.log(o)}v.value=!1},c=async o=>{try{const f=await navigator.clipboard.readText();p.value[o].explanation=f}catch(f){console.error("Failed to read clipboard contents: ",f)}};return(o,f)=>(l(),s("div",null,[a("div",ea,[a("div",aa,[a("div",la,[(l(!0),s(B,null,I(p.value,(h,_)=>(l(),s("div",{key:_,class:"question-card"},[a("p",ta,w(_+1),1),N(a("input",{type:"text","onUpdate:modelValue":e=>h.question=e},null,8,sa),[[Y,h.question]]),a("ul",oa,[N(a("input",{type:"text","onUpdate:modelValue":e=>h.correct_answer=e},null,8,ra),[[Y,h.correct_answer]])]),N(a("textarea",{name:"explanation textarea",placeholder:"no explanation yet","aria-label":"explanation","onUpdate:modelValue":e=>h.explanation=e},null,8,ia),[[Y,h.explanation]]),a("button",{onClick:e=>c(_)}," Paste from Clipboard ",8,na)]))),128))])])]),a("div",ca,[(l(!0),s(B,null,I(p.value,(h,_)=>(l(),s("div",{key:h.id,class:"w"},[a("span",null,w(h.number),1),N(a("input",{type:"text","onUpdate:modelValue":e=>h.correct_answer=e},null,8,ua),[[Y,h.correct_answer]])]))),128))]),f[0]||(f[0]=a("p",{class:"end"},"End of MCQs",-1)),a("div",pa,[a("div",da,[a("button",{"aria-busy":v.value,class:"save",onClick:A},[v.value?g("",!0):(l(),s("span",ha," Save "))],8,va)])])]))}}),ba=Q(ya,[["__scopeId","data-v-f5e1258f"]]),ga={class:"container"},Ca=["value"],ma={key:0,"aria-busy":"true"},Pa=L({__name:"BestOfFive",props:{selectedBook:{},editing:{type:Boolean}},setup(E){const n=H("pb"),i=E;let p=k({}),v=k("");const A=k(!1),c={bof1:[{value:"Chapter 1: Clinical Skills",label:"Chapter 1: Clinical Skills"},{value:"Chapter 2: Core Clinical Psychiatry",label:"Chapter 2: Core Clinical Psychiatry"},{value:"Chapter 3: Psychopathology",label:"Chapter 3: Psychopathology"},{value:"Chapter 4: Psychology",label:"Chapter 4: Psychology"},{value:"Chapter 5: Psychopharmacology",label:"Chapter 5: Psychopharmacology"},{value:"Chapter 6: History, Social Psychiatry and Ethics",label:"Chapter 6: History, Social Psychiatry and Ethics"}],bof2:[{value:"Chapter 1: Psychiatric Genetics",label:"Chapter 1: Psychiatric Genetics"},{value:"Chapter 2: Epidemiology",label:"Chapter 2: Epidemiology"},{value:"Chapter 3: Advanced Psychology",label:"Chapter 3: Advanced Psychology"},{value:"Chapter 4: Pharmacology",label:"Chapter 4: Pharmacology"},{value:"Chapter 5: Neurosciences",label:"Chapter 5: Neurosciences"}],bof3:[{value:"Chapter 1: General Adult Psychiatry",label:"Chapter 1: General Adult Psychiatry"},{value:"Chapter 2: Forensic and Rehabilitation Psychiatry",label:"Chapter 2: Forensic and Rehabilitation Psychiatry"},{value:"Chapter 3: Child Psychiatry and Learning Disabilities",label:"Chapter 3: Child Psychiatry and Learning Disabilities"},{value:"Chapter 4: Old Age Psychiatry",label:"Chapter 4: Old Age Psychiatry"},{value:"Chapter 5: Substance Use Disorders",label:"Chapter 5: Substance Use Disorders"},{value:"Chapter 6: Organic, Liaison, and Perinatal Psychiatry",label:"Chapter 6: Organic, Liaison, and Perinatal Psychiatry"},{value:"Chapter 7: Psychotherapy",label:"Chapter 7: Psychotherapy"},{value:"Chapter 8: Basic Statistics",label:"Chapter 8: Basic Statistics"}],"600-1":[{value:"Chapter 1",label:"Chapter 1"},{value:"Chapter 2",label:"Chapter 2"},{value:"Chapter 3",label:"Chapter 3"},{value:"Chapter 4",label:"Chapter 4"},{value:"Chapter 5",label:"Chapter 5"}],"600-2":[{value:"Chapter 1",label:"Chapter 1"},{value:"Chapter 2",label:"Chapter 2"},{value:"Chapter 3",label:"Chapter 3"},{value:"Chapter 4",label:"Chapter 4"},{value:"Chapter 5",label:"Chapter 5"}],501:[{value:"Part 1",label:"Part 1"},{value:"Part 2",label:"Part 2"},{value:"Part 3",label:"Part 3"},{value:"Part 4",label:"Part 4"},{value:"Part 5",label:"Part 5"},{value:"Part 6",label:"Part 6"},{value:"Part 7",label:"Part 7"},{value:"Part 8",label:"Part 8"},{value:"Part 9",label:"Part 9"},{value:"Part 10",label:"Part 10"}],prite:[{value:"Part 1",label:"Part 1"},{value:"Part 2",label:"Part 2"},{value:"Part 3",label:"Part 3"},{value:"Part 4",label:"Part 4"},{value:"Part 5",label:"Part 5"},{value:"Part 6",label:"Part 6"},{value:"Part 7",label:"Part 7"},{value:"Part 8",label:"Part 8"},{value:"Part 9",label:"Part 9"},{value:"Part 10",label:"Part 10"},{value:"Part 11",label:"Part 11"},{value:"Part 12",label:"Part 12"}],1200:[{value:"Chapter 1: PSYCHOPATHOLOGY",label:"Chapter 1: PSYCHOPATHOLOGY"},{value:"Chapter 2: SCHIZOPHRENIA",label:"Chapter 2: SCHIZOPHRENIA"},{value:"Chapter 3: MOOD DISORDERS",label:"Chapter 3: MOOD DISORDERS"},{value:"Chapter 4: ANXIETY DISORDERS",label:"Chapter 4: ANXIETY DISORDERS"},{value:"Chapter 5: GERIATRIC PSYCHIATRY",label:"Chapter 5: GERIATRIC PSYCHIATRY"},{value:"Chapter 6: CHILD PSYCHIATRY",label:"Chapter 6: CHILD PSYCHIATRY"},{value:"Chapter 7: CONSULTATION LIAISON PSYCHIATRY",label:"Chapter 7: CONSULTATION LIAISON PSYCHIATRY"},{value:"Chapter 8: FORENSIC PSYCHIATRY",label:"Chapter 8: FORENSIC PSYCHIATRY"},{value:"Chapter 9: SUBSTANCE USE",label:"Chapter 9: SUBSTANCE USE"},{value:"Chapter 10: EATING AND SEXUAL DISORDERS",label:"Chapter 10: EATING AND SEXUAL DISORDERS"},{value:"Chapter 11: MENTAL RETARDATION",label:"Chapter 11: MENTAL RETARDATION"},{value:"Chapter 12: SLEEP DISORDERS",label:"Chapter 12: SLEEP DISORDERS"},{value:"Chapter 13: PERSONALITY DISORDERS",label:"Chapter 13: PERSONALITY DISORDERS"},{value:"Chapter 14: PSYCHOPHARMACOLOGY",label:"Chapter 14: PSYCHOPHARMACOLOGY"},{value:"Chapter 15: PSYCHOTHERAPY",label:"Chapter 15: PSYCHOTHERAPY"},{value:"Chapter 16: PSYCHOLOGY",label:"Chapter 16: PSYCHOLOGY"},{value:"Chapter 17: EMERGENCY PSYCHIATRY",label:"Chapter 17: EMERGENCY PSYCHIATRY"},{value:"Chapter 18: NEUROLOGY",label:"Chapter 18: NEUROLOGY"},{value:"Chapter 19: MISCELLANEOUS QUESTIONS",label:"Chapter 19: MISCELLANEOUS QUESTIONS"}],gt1:[{value:"Basic psychological processes",label:"Basic psychological processes"},{value:"Learning theory and personality",label:"Learning theory and personality"},{value:"Human development",label:"Human development"},{value:"Social psychology and basic psychological treatments",label:"Social psychology and basic psychological treatments"},{value:"Descriptive psychopathology",label:"Descriptive psychopathology"},{value:"Psychopharmacology: antidepressants and anxiolytics",label:"Psychopharmacology: antidepressants and anxiolytics"},{value:"Psychopharmacology: antipsychotics and organic disorders",label:"Psychopharmacology: antipsychotics and organic disorders"},{value:"Clinical psychiatry 1",label:"Clinical psychiatry 1"},{value:"Clinical psychiatry 2",label:"Clinical psychiatry 2"},{value:"Clinical psychiatry 3",label:"Clinical psychiatry 3"},{value:"Clinical psychiatry 4",label:"Clinical psychiatry 4"},{value:"Clinical psychiatry 5",label:"Clinical psychiatry 5"}],gt2:[{value:"Advanced psychological processes and treatments 1",label:"Advanced psychological processes and treatments 1"},{value:"Advanced psychological processes and treatments 2",label:"Advanced psychological processes and treatments 2"},{value:"Advanced psychology, pharmacology and treatments",label:"Advanced psychology, pharmacology and treatments"},{value:"Neurosciences",label:"Neurosciences"},{value:"Genetics and basic neurosciences",label:"Genetics and basic neurosciences"},{value:"Psychopharmacology",label:"Psychopharmacology"},{value:"Epidemiology",label:"Epidemiology"}],gt3:[{value:"General adult psychiatry 1",label:"General adult psychiatry 1"},{value:"General adult psychiatry 2",label:"General adult psychiatry 2"},{value:"Old age psychiatry",label:"Old age psychiatry"},{value:"Addiction psychiatry and forensic psychiatry",label:"Addiction psychiatry and forensic psychiatry"},{value:"Child and adolescent psychiatry and learning disability",label:"Child and adolescent psychiatry and learning disability"},{value:"Research methods, evidence-based practice, statistics and critical appraisal 1",label:"Research methods, evidence-based practice, statistics and critical appraisal 1"},{value:"Research methods, evidence-based practice, statistics and critical appraisal 2",label:"Research methods, evidence-based practice, statistics and critical appraisal 2"}],spmm:[{value:"Basic Psychology",label:"Basic Psychology"},{value:"Social Psychology",label:"Social Psychology"},{value:"Sociocultural Psychiatry",label:"Sociocultural Psychiatry"},{value:"Human Development",label:"Human Development"},{value:"Neuroanatomy",label:"Neuroanatomy"},{value:"Neuroaphysiology",label:"Neuroaphysiology"},{value:"Neurochemistry",label:"Neurochemistry"},{value:"Molecular Genetics",label:"Molecular Genetics"},{value:"Neuropathology",label:"Neuropathology"},{value:"Applied Neurosciences",label:"Applied Neurosciences"},{value:"Basic Pharmacology",label:"Basic Pharmacology"},{value:"Pharmacokinetics",label:"Pharmacokinetics"},{value:"Pharmacodynamics",label:"Pharmacodynamics"},{value:"Adverse Effects",label:"Adverse Effects"},{value:"Classification",label:"Classification"},{value:"Clinical Examination",label:"Clinical Examination"},{value:"Descriptive Psychopathology",label:"Descriptive Psychopathology"},{value:"Dynamic Psychopathology",label:"Dynamic Psychopathology"},{value:"Rating scales",label:"Rating scales"},{value:"2016 paper 1",label:"2016 paper 1"},{value:"2016 paper 2",label:"2016 paper 2"},{value:"2016 Additional",label:"2016 Additional"},{value:"2017 paper 1",label:"2017 paper 1"},{value:"2017 paper 2",label:"2017 paper 2"},{value:"2018 paper 1",label:"2018 paper 1"},{value:"2018 paper 2",label:"2018 paper 2"},{value:"2019 paper 1",label:"2019 paper 1"},{value:"2019 paper 2",label:"2019 paper 2"},{value:"2020 paper 1",label:"2020 paper 1"},{value:"2020 paper 2",label:"2020 paper 2"},{value:"2021 paper 1",label:"2021 paper 1"},{value:"2021 paper 2",label:"2021 paper 2"},{value:"2021 Additional",label:"2021 Additional"}],ghazi:[{value:"Part 1",label:"Part 1"},{value:"Part 2",label:"Part 2"},{value:"Part 3",label:"Part 3"},{value:"Part 4",label:"Part 4"},{value:"Part 5",label:"Part 5"},{value:"Part 6",label:"Part 6"}],focus:[{value:"Part 1",label:"Part 1"},{value:"Part 2",label:"Part 2"},{value:"Part 3",label:"Part 3"},{value:"Part 4",label:"Part 4"}],pretest:[{value:"Evaluation, Assessment, and Diagnosis",label:"Evaluation, Assessment, and Diagnosis"},{value:"Human Behavior: Theories of Personality and Development",label:"Human Behavior: Theories of Personality and Development"},{value:"Human Behavior: Biologic and Related Sciences",label:"Human Behavior: Biologic and Related Sciences"},{value:"Disorders Seen in Childhood and Adolescence",label:"Disorders Seen in Childhood and Adolescence"},{value:"Neurocognitive Disorders and Consultation-Liaison Psychiatry",label:"Neurocognitive Disorders and Consultation-Liaison Psychiatry"},{value:"Schizophrenia and Other Psychotic Disorders",label:"Schizophrenia and Other Psychotic Disorders"},{value:"Psychotherapies",label:"Psychotherapies"},{value:"Mood Disorders",label:"Mood Disorders"},{value:"Anxiety, Obsessive-Compulsive, Trauma",label:"Anxiety, Obsessive-Compulsive, Trauma"},{value:"Personality Disorders, Human Sexuality",label:"Personality Disorders, Human Sexuality"},{value:"Substance-Related Disorders",label:"Substance-Related Disorders"},{value:"Psychopharmacology and Other Somatic Therapies",label:"Psychopharmacology and Other Somatic Therapies"},{value:"Law and Ethics in Psychiatry",label:"Law and Ethics in Psychiatry"}]},o=async(h,_)=>{A.value=!0;try{const e=await n.collection("mcqs").getFullList({filter:`book = "${h}" && chapter = "${_}"`,sort:"number"});p.value=e}catch(e){console.error("Error loading questions data:",e),p.value={}}A.value=!1},f=R(()=>i.selectedBook==="bof1"?"Best Of Five 1: 450 MCQ":i.selectedBook==="bof2"?"Best Of Five 2: 455 MCQ":i.selectedBook==="bof3"?"Best Of Five 3: 350 MCQ":i.selectedBook==="600-1"?"600 Paper 1: 634 MCQ":i.selectedBook==="600-2"?"600 Paper 2: 665 MCQ":i.selectedBook==="501"?"501 Psychopharmacology: 566 MCQ":i.selectedBook==="spmm"?"SPMM: 2375 MCQ":i.selectedBook==="gt1"?"Get Through Paper 1: 640 MCQ":i.selectedBook==="gt2"?"Get Through Paper 2: 350 MCQ":i.selectedBook==="gt3"?"Get Through Paper 3: 387 MCQ":i.selectedBook==="focus"?"Focus Psychiatry Review: 500 MCQ ":i.selectedBook==="pretest"?"Pretest Psychiatry: 400 MCQ ":i.selectedBook==="1200"?"Psychiatry 1200: 1170 MCQ ":"Dr.Ghazi Telegram Group : 296 MCQ");return(h,_)=>{var e,t;return l(),s("div",ga,[a("h5",null,w(f.value),1),N(a("select",{name:"select","aria-label":"Select",required:"",class:"primary","onUpdate:modelValue":_[0]||(_[0]=b=>x(v)?v.value=b:v=b),onChange:_[1]||(_[1]=b=>o(h.selectedBook,u(v)))},[_[2]||(_[2]=a("option",{selected:"",disabled:"",value:""},"Select Chapter",-1)),(l(!0),s(B,null,I(c[h.selectedBook]||[],b=>(l(),s("option",{key:b.value,value:b.value},w(b.label),9,Ca))),128))],544),[[j,u(v)]]),A.value?(l(),s("article",ma,"Loading...")):u(p)&&Object.keys(u(p)).length>0&&h.selectedBook&&!h.editing?(l(),T(We,{key:JSON.stringify(((e=u(p)[0])==null?void 0:e.question)||""),questionsData:u(p),selectedBook:h.selectedBook,selectedChapter:u(v)},null,8,["questionsData","selectedBook","selectedChapter"])):u(p)&&Object.keys(u(p)).length>0&&h.selectedBook&&h.editing?(l(),T(ba,{key:JSON.stringify(((t=u(p)[0])==null?void 0:t.explanation)||""),questionsData:u(p)},null,8,["questionsData"])):g("",!0)])}}}),fa={key:0,class:"container"},_a={key:1,class:"container"},ka={key:2,class:"container"},wa={class:"questions-container"},Sa={class:"question-text"},Aa={class:"options-list"},Oa=["onClick","disabled"],Ea={key:0},Da={class:"explanation"},$a=["onClick"],Ba=L({__name:"Flag",setup(E){const n=k([]),i=k([]),p=k(0),v=k(0),A=k(""),c=k(!1),o=H("pb");U(()=>{h()});const f=t=>t==="bof1"?"Best Of Five 1":t==="bof2"?"Best Of Five 2":t==="bof3"?"Best Of Five 3":t==="600-1"?"600 Paper 1":t==="600-2"?"600 Paper 2":t==="501"?"501 Psychopharmacology":t==="spmm"?"SPMM":t==="gt1"?"Get Through Paper 1":t==="gt2"?"Get Through Paper 2":t==="gt3"?"Get Through Paper 3":t==="focus"?"Focus Psychiatry Review ":t==="pretest"?"Pretest Psychiatry ":t==="1200"?"Psychiatry 1200 ":"Dr.Ghazi Telegram Group ",h=async()=>{var t,b;c.value=!0;try{const C=await o.collection("flags").getFirstListItem(`user.id="${(t=o.authStore.record)==null?void 0:t.id}"`,{expand:"mcqs,user"});n.value=(b=C.expand)==null?void 0:b.mcqs,A.value=C.id,i.value=Array(n.value.length).fill(null)}catch(C){console.error("Error fetching questions:",C)}c.value=!1},_=async t=>{var b;try{const C=(b=n.value[t])==null?void 0:b.id;if(!C)throw new Error("MCQ ID is undefined");if(n.value.length===1){await o.collection("flags").delete(A.value),console.log(`Deleted collection with ID: ${A.value}`),n.value=[],i.value=[];return}else await o.collection("flags").update(A.value,{"mcqs-":C}),n.value.splice(t,1),i.value.splice(t,1),console.log(`Deleted MCQ with ID: ${C}`)}catch(C){console.error("Error deleting flagged MCQ:",C)}},e=async(t,b,C,O)=>{i.value[t]===null&&(i.value[t]=C,b===O?p.value+=1:(v.value+=1,n.value[t].showCorrectAnswer=!0))};return(t,b)=>c.value?(l(),s("div",fa,b[0]||(b[0]=[a("article",{"aria-busy":"true"},null,-1)]))):n.value.length?(l(),s("div",ka,[a("p",null,w(n.value.length>1?n.value.length+" questions":n.value.length+" question"),1),a("div",wa,[n.value?(l(!0),s(B,{key:0},I(n.value,(C,O)=>(l(),s("div",{key:O,class:"question-card"},[b[3]||(b[3]=a("span",null,"From ",-1)),a("span",null,w(f(C.book))+", "+w(C.chapter),1),b[4]||(b[4]=a("hr",null,null,-1)),a("p",Sa,w(O+1)+" - "+w(C.question),1),a("ul",Aa,[(l(!0),s(B,null,I(C.options,(D,$)=>(l(),s("li",{key:$,class:G(["option",{"correct-option":$===C.correct_answer&&(i.value[O]===D||C.showCorrectAnswer),"incorrect-option":i.value[O]&&$!==C.correct_answer&&i.value[O]===D}]),onClick:z=>e(O,$,D,C.correct_answer),disabled:i.value[O]!==null},w($)+". "+w(D),11,Oa))),128))]),i.value[O]!==null?(l(),s("details",Ea,[b[2]||(b[2]=a("summary",{role:"button",class:"outline secondary"},"Explanation",-1)),a("p",Da,w(C.explanation),1)])):g("",!0),a("button",{onClick:D=>_(O)},"Delete",8,$a)]))),128)):g("",!0)]),b[5]||(b[5]=a("p",{class:"end"},"End of MCQs",-1))])):(l(),s("div",_a,b[1]||(b[1]=[a("p",{class:"end"},"There are no flagged questions",-1)])))}}),Ia=Q(Ba,[["__scopeId","data-v-4c31fcfb"]]),Ra={class:"container"},Na={class:"grid mt-2"},Ta={class:"grid mt-2"},La={class:"grid mt-2"},Ha={key:6,class:"center"},Ma={class:"image-container"},Ya=["src"],Ga=L({__name:"Home",emits:["logout"],setup(E,{emit:n}){var h;const i=H("pb");let p=k(""),v=k(!1),A=k(!0);A.value=((h=i.authStore.record)==null?void 0:h.email)==="edit@mcq.com";let c=k(null);const o=_=>{p.value=_,c.value=new URL(Object.assign({"../assets/small/1200.webp":K,"../assets/small/501.webp":Z,"../assets/small/600-1.webp":W,"../assets/small/600-2.webp":ee,"../assets/small/bof1.webp":ae,"../assets/small/bof2.webp":le,"../assets/small/bof3.webp":te,"../assets/small/flag.webp":se,"../assets/small/focus.webp":oe,"../assets/small/ghazi.webp":re,"../assets/small/gt1.webp":ie,"../assets/small/gt2.webp":ne,"../assets/small/gt3.webp":ce,"../assets/small/pretest.webp":ue,"../assets/small/prite.webp":pe,"../assets/small/spmm.webp":de})[`../assets/small/${_}.webp`],import.meta.url).href,window.scrollTo(0,0),Ee("image click",{event_category:"clicks",event_label:"image selected",value:_})},f=()=>{c.value=null,p.value="",v.value=!1};return(_,e)=>(l(),T(J,{mode:"out-in"},{default:X(()=>[a("div",Ra,[a("div",Na,[u(c)?g("",!0):(l(),s("div",{key:0,class:"center",onClick:e[0]||(e[0]=()=>{o("flag"),x(v)?v.value=!0:v=!0})},e[18]||(e[18]=[a("img",{loading:"lazy",src:ve,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:1,class:"center",onClick:e[1]||(e[1]=t=>o("bof1"))},e[19]||(e[19]=[a("img",{loading:"lazy",src:he,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:2,class:"center",onClick:e[2]||(e[2]=t=>o("bof2"))},e[20]||(e[20]=[a("img",{loading:"lazy",src:ye,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:3,class:"center",onClick:e[3]||(e[3]=t=>o("bof3"))},e[21]||(e[21]=[a("img",{loading:"lazy",src:be,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:4,class:"center",onClick:e[4]||(e[4]=t=>o("600-1"))},e[22]||(e[22]=[a("img",{loading:"lazy",src:ge,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:5,class:"center",onClick:e[5]||(e[5]=t=>o("600-2"))},e[23]||(e[23]=[a("img",{loading:"lazy",src:Ce,alt:""},null,-1)])))]),a("div",Ta,[u(c)?g("",!0):(l(),s("div",{key:0,class:"center",onClick:e[6]||(e[6]=t=>o("1200"))},e[24]||(e[24]=[a("img",{loading:"lazy",src:me,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:1,class:"center",onClick:e[7]||(e[7]=t=>o("spmm"))},e[25]||(e[25]=[a("img",{loading:"lazy",src:Pe,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:2,class:"center",onClick:e[8]||(e[8]=t=>o("gt1"))},e[26]||(e[26]=[a("img",{loading:"lazy",src:fe,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:3,class:"center",onClick:e[9]||(e[9]=t=>o("gt2"))},e[27]||(e[27]=[a("img",{loading:"lazy",src:_e,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:4,class:"center",onClick:e[10]||(e[10]=t=>o("gt3"))},e[28]||(e[28]=[a("img",{loading:"lazy",src:ke,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:5,class:"center",onClick:e[11]||(e[11]=t=>o("pretest"))},e[29]||(e[29]=[a("img",{loading:"lazy",src:we,alt:""},null,-1)])))]),a("div",null,[a("div",La,[u(c)?g("",!0):(l(),s("div",{key:0,class:"center",onClick:e[12]||(e[12]=t=>o("focus"))},e[30]||(e[30]=[a("img",{loading:"lazy",src:Se,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:1,class:"center",onClick:e[13]||(e[13]=t=>o("501"))},e[31]||(e[31]=[a("img",{loading:"lazy",src:Ae,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:2,class:"center",onClick:e[14]||(e[14]=t=>o("ghazi"))},e[32]||(e[32]=[a("img",{loading:"lazy",src:Oe,alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:3,class:"center",onClick:e[15]||(e[15]=t=>o("ghazi"))},e[33]||(e[33]=[a("img",{loading:"lazy",src:"",alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:4,class:"center",onClick:e[16]||(e[16]=t=>o("focus"))},e[34]||(e[34]=[a("img",{loading:"lazy",src:"",alt:""},null,-1)]))),u(c)?g("",!0):(l(),s("div",{key:5,class:"center",onClick:e[17]||(e[17]=t=>o("focus"))},e[35]||(e[35]=[a("img",{loading:"lazy",src:"",alt:""},null,-1)]))),u(c)?(l(),s("div",Ha,[a("div",Ma,[a("img",{loading:"lazy",src:u(c),alt:"Selected Image"},null,8,Ya),a("button",{class:"cancel-button",onClick:f},e[36]||(e[36]=[a("i",{class:"fas fa-times"},null,-1)]))])])):g("",!0)])]),u(v)?(l(),T(Ia,{key:0})):u(p)!==""?(l(),T(Pa,{key:1,selectedBook:u(c)?u(p):"",editing:u(A)},null,8,["selectedBook","editing"])):g("",!0)])]),_:1}))}}),za=Q(Ga,[["__scopeId","data-v-5f520522"]]);export{za as default};

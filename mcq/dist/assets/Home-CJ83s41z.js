import{d as L,i as M,r as f,c as R,o as x,a as l,b as o,e as a,F as O,f as $,g,t as w,n as G,_ as H,w as T,v as F,h as Z,u,j as U,k as N,l as ee,T as ae}from"./index-mZAC1Hec.js";const le="/assets/1200-DVlGU8Vs.webp",se="/assets/501-Bjv-yp59.webp",te="/assets/600-1-0j3TdL2g.webp",oe="/assets/600-2-97LUNhQf.webp",re="/assets/apa-Cg2S38O5.webp",ie="/assets/bof1-DO85Xb_Y.webp",ne="/assets/bof2-BnUsYsFl.webp",ce="/assets/bof3-CBVzHEFc.webp",ue="/assets/flag-CQhQGjVs.webp",de="/assets/focus-p9ABiVhh.webp",pe="/assets/ghazi-DJab20xm.webp",ve="/assets/gt1-JxKh0IgB.webp",he="/assets/gt2-BPySXylE.webp",ye="/assets/gt3-ALwx4Lof.webp",be="/assets/pretest-7bj1kfbQ.webp",ge="/assets/prite-CjU4Lftm.webp",me="/assets/spmm-k-Am_ueg.webp",Ce="/assets/flag-CQhQGjVs.webp",Pe="/assets/bof1-DO85Xb_Y.webp",fe="/assets/bof2-BnUsYsFl.webp",_e="/assets/bof3-CBVzHEFc.webp",ke="/assets/600-1-0j3TdL2g.webp",Se="/assets/600-2-97LUNhQf.webp",we="/assets/1200-DVlGU8Vs.webp",De="/assets/spmm-k-Am_ueg.webp",Ae="/assets/gt1-JxKh0IgB.webp",Ee="/assets/gt2-BPySXylE.webp",Oe="/assets/gt3-ALwx4Lof.webp",Be="/assets/pretest-7bj1kfbQ.webp",Ie="/assets/focus-p9ABiVhh.webp",$e="/assets/501-Bjv-yp59.webp",Re="/assets/apa-Cg2S38O5.webp",Te="/assets/ghazi-DJab20xm.webp";function q(E,n={}){typeof window.gtag=="function"?window.gtag("event",E,n):console.error("Google Analytics is not initialized.")}const Ne={class:"container"},Le={id:"app"},Me={class:"questions-container"},He={class:"question-image"},Ye=["src","onClick"],Fe={class:"question-text"},Ge={class:"options-list"},ze=["onClick","disabled"],Qe={key:0},xe={class:"explanation"},Ue=["aria-busy","onClick"],qe=["src"],Ve={class:"score-bar"},je={class:"flex-1"},Xe={class:"toHide"},Je={class:"toHide2"},We={class:"margin-2"},Ke={class:"margin-2"},Ze={class:"margin-2"},ea={class:"flex-2"},aa=["aria-busy"],la={key:0},sa=L({__name:"ChapterMCQs",props:["questionsData","selectedChapter","selectedBook"],setup(E){const n=M("pb"),i=E,d=f(i.questionsData),h=f(Array(d.value.length).fill(null)),D=f(0),c=f(0),r=f(!1),_=f([]),k=f(!1),C=f(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches),e=f(null),s=b=>{e.value=b},m=()=>{e.value=null};window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",b=>{C.value=b.matches});const y=async()=>{var b;r.value=!0;try{const t=await n.collection("progress").getFirstListItem(`user = "${(b=n.authStore.record)==null?void 0:b.id}" && book = "${i.selectedBook}" && chapter = "${i.selectedChapter}"`);t!=null&&t.answered&&(h.value=d.value.map(p=>{const v=t.answered.find(S=>S.questionId===p.id);return v&&(p.showCorrectAnswer=v.showCorrectAnswer),(v==null?void 0:v.selectedOption)||null}),D.value=t.right||0,c.value=t.wrong||0)}catch(t){console.log("No progress found for this chapter:",t)}r.value=!1},A=async()=>{var p,v;r.value=!0;const b=d.value.map((S,P)=>({questionId:S.id,selectedOption:h.value[P],showCorrectAnswer:S.showCorrectAnswer||!1})),t={user:(p=n.authStore.record)==null?void 0:p.id,chapter:i.selectedChapter,book:i.selectedBook,answered:b,right:D.value,wrong:c.value};try{const S=await n.collection("progress").getFirstListItem(`user = "${(v=n.authStore.record)==null?void 0:v.id}" && book = "${i.selectedBook}" && chapter = "${i.selectedChapter}"`);S&&await n.collection("progress").update(S.id,t)}catch{await n.collection("progress").create(t)}r.value=!1},B=async()=>{var b;r.value=!0,h.value=Array(d.value.length).fill(null),D.value=0,c.value=0,d.value.forEach(t=>{t.showCorrectAnswer=!1});try{const t=await n.collection("progress").getFirstListItem(`user = "${(b=n.authStore.record)==null?void 0:b.id}" && book = "${i.selectedBook}" && chapter = "${i.selectedChapter}"`);t&&await n.collection("progress").delete(t.id)}catch(t){console.error("Error in resetting progress:",t)}finally{r.value=!1}},I=async(b,t,p,v)=>{h.value[b]===null&&(h.value[b]=p,t===v?D.value+=1:(c.value+=1,d.value[b].showCorrectAnswer=!0)),A()},z=async()=>{var b,t,p,v,S;try{const P=await n.collection("flags").getFirstListItem(`user.id="${(b=n.authStore.record)==null?void 0:b.id}"`,{expand:"mcqs"});if(!P||!((t=P.expand)!=null&&t.mcqs))throw new Error("No flagged questions found");let Y=(p=P.expand)==null?void 0:p.mcqs.filter(Q=>Q.book===i.selectedBook&&Q.chapter===i.selectedChapter);return Y&&Y[0]?(_.value=Y,{id:P.id,count:(v=P.expand)==null?void 0:v.mcqs.length}):{id:P.id,count:(S=P.expand)==null?void 0:S.mcqs.length}}catch(P){console.log("No flagged questions found for this chapter:",P)}},V=async(b,t)=>{var p;if(n.authStore.record){k.value=!0;try{const v=await z();if(!(v!=null&&v.id)){const P=await n.collection("flags").create({user:(p=n.authStore.record)==null?void 0:p.id,mcqs:[b]});_.value.push(d.value[t]);return}_.value.some(P=>P.id===b)?v.count>1?(await n.collection("flags").update(v.id,{"mcqs-":b}),_.value=_.value.filter(P=>P.id!==b)):(await n.collection("flags").delete(v.id),_.value=_.value.filter(P=>P.id!==b)):(await n.collection("flags").update(v.id,{"mcqs+":b}),_.value.push(d.value[t]))}catch(v){console.error("Error in toggling flag:",v)}k.value=!1}},j=()=>{const b=d.value.map((t,p)=>({question:t,selectedOption:h.value[p]}));b.sort(()=>Math.random()-.5),d.value=b.map(t=>t.question),h.value=b.map(t=>t.selectedOption)},X=R(()=>D.value/d.value.length*100),J=R(()=>d.value.length),W=R(()=>D.value),K=R(()=>c.value);return x(()=>{z(),y()}),(b,t)=>(l(),o("div",{class:G({dark:C.value})},[a("div",Ne,[a("div",Le,[a("div",Me,[(l(!0),o(O,null,$(d.value,(p,v)=>(l(),o("div",{key:v,class:"question-card"},[a("div",He,[p.image?(l(),o("img",{key:0,src:`https://mcq-db.dakakean.com/api/files/mcqs/${p.id}/${p.image}`,alt:"",onClick:S=>s(`https://mcq-db.dakakean.com/api/files/mcqs/${p.id}/${p.image}`)},null,8,Ye)):g("",!0)]),a("p",Fe,w(v+1)+" - "+w(p.question),1),a("ul",Ge,[(l(!0),o(O,null,$(p.options,(S,P)=>(l(),o("li",{key:P,class:G(["option",{"correct-option":P===p.correct_answer&&(h.value[v]===S||p.showCorrectAnswer),"incorrect-option":h.value[v]&&P!==p.correct_answer&&h.value[v]===S}]),onClick:Y=>I(v,P,S,p.correct_answer),disabled:h.value[v]!==null},w(P)+". "+w(S),11,ze))),128))]),h.value[v]!==null&&p.explanation&&["bof1","bof2","bof3","gt1","gt2","gt3"].includes(E.selectedBook)?(l(),o("details",Qe,[t[0]||(t[0]=a("summary",{role:"button",class:"outline secondary"}," Explanation ",-1)),a("p",xe,w(p.explanation),1)])):g("",!0),p.showCorrectAnswer?(l(),o("button",{key:1,"aria-busy":k.value,class:G(_.value.some(S=>S.id===p.id)?"unflag":"flag"),onClick:S=>V(p.id,v)},w(k.value?"    ":_.value.some(S=>S.id===p.id)?"unflag":"flag"),11,Ue)):g("",!0)]))),128))])])]),e.value?(l(),o("div",{key:0,class:"fullscreen-modal",onClick:m},[a("img",{src:e.value,alt:"Fullscreen Image"},null,8,qe)])):g("",!0),t[8]||(t[8]=a("p",{class:"end"},"End of MCQs",-1)),a("div",Ve,[a("div",je,[a("div",Xe,[a("span",null,w(J.value)+" MCQ",1)]),t[4]||(t[4]=a("span",{class:"toHide"}," | ",-1)),a("div",Je,[t[1]||(t[1]=a("i",{class:"fa-solid fa-square-poll-vertical"},null,-1)),a("span",We,w(X.value.toFixed(0))+"/100",1)]),t[5]||(t[5]=a("span",{class:"toHide2"}," | ",-1)),a("div",null,[t[2]||(t[2]=a("i",{class:"fa-solid fa-square-check"},null,-1)),a("span",Ke,w(W.value),1)]),t[6]||(t[6]=a("span",null," | ",-1)),a("div",null,[t[3]||(t[3]=a("i",{class:"fa-solid fa-square-xmark"},null,-1)),a("span",Ze,w(K.value),1)]),t[7]||(t[7]=a("span",null," | ",-1))]),a("div",ea,[a("button",{"aria-busy":r.value,class:"reset",onClick:B},[r.value?g("",!0):(l(),o("span",la," Reset "))],8,aa),a("button",{class:"randomize",onClick:j},"Randomize")])])],2))}}),ta=H(sa,[["__scopeId","data-v-dfb7ca6b"]]),oa={class:"container"},ra={id:"app"},ia={class:"questions-container"},na={class:"question-text"},ca=["onUpdate:modelValue"],ua={class:"options-list"},da=["onUpdate:modelValue"],pa=["onUpdate:modelValue"],va=["onClick"],ha={class:"answers"},ya=["onUpdate:modelValue"],ba={class:"score-bar"},ga={class:"flex-1"},ma=["aria-busy"],Ca={key:0},Pa=L({__name:"Edit",props:["questionsData"],setup(E){const n=M("pb"),d=f(E.questionsData),h=f(!1),D=async()=>{h.value=!0;try{for(const r of d.value)await n.collection("mcqs").update(r.id,{...r,explanation:r.explanation,correct_answer:r.correct_answer,question:r.question}),console.log("saved question")}catch(r){console.log("Error saving explanations"),console.log(r)}h.value=!1},c=async r=>{try{const _=await navigator.clipboard.readText();d.value[r].explanation=_}catch(_){console.error("Failed to read clipboard contents: ",_)}};return(r,_)=>(l(),o("div",null,[a("div",oa,[a("div",ra,[a("div",ia,[(l(!0),o(O,null,$(d.value,(k,C)=>(l(),o("div",{key:C,class:"question-card"},[a("p",na,w(C+1),1),T(a("input",{type:"text","onUpdate:modelValue":e=>k.question=e},null,8,ca),[[F,k.question]]),a("ul",ua,[T(a("input",{type:"text","onUpdate:modelValue":e=>k.correct_answer=e},null,8,da),[[F,k.correct_answer]])]),T(a("textarea",{name:"explanation textarea",placeholder:"no explanation yet","aria-label":"explanation","onUpdate:modelValue":e=>k.explanation=e},null,8,pa),[[F,k.explanation]]),a("button",{onClick:e=>c(C)}," Paste from Clipboard ",8,va)]))),128))])])]),a("div",ha,[(l(!0),o(O,null,$(d.value,(k,C)=>(l(),o("div",{key:k.id,class:"w"},[a("span",null,w(k.number),1),T(a("input",{type:"text","onUpdate:modelValue":e=>k.correct_answer=e},null,8,ya),[[F,k.correct_answer]])]))),128))]),_[0]||(_[0]=a("p",{class:"end"},"End of MCQs",-1)),a("div",ba,[a("div",ga,[a("button",{"aria-busy":h.value,class:"save",onClick:D},[h.value?g("",!0):(l(),o("span",Ca," Save "))],8,ma)])])]))}}),fa=H(Pa,[["__scopeId","data-v-f5e1258f"]]),_a=["value"],ka={key:0,"aria-busy":"true"},Sa=L({__name:"BestOfFive",props:{selectedBook:{},editing:{type:Boolean}},setup(E){const n=M("pb"),i=E;let d=f({}),h=f("");const D=f(!1),c={bof1:[{value:"Chapter 1: Clinical Skills",label:"Chapter 1: Clinical Skills"},{value:"Chapter 2: Core Clinical Psychiatry",label:"Chapter 2: Core Clinical Psychiatry"},{value:"Chapter 3: Psychopathology",label:"Chapter 3: Psychopathology"},{value:"Chapter 4: Psychology",label:"Chapter 4: Psychology"},{value:"Chapter 5: Psychopharmacology",label:"Chapter 5: Psychopharmacology"},{value:"Chapter 6: History, Social Psychiatry and Ethics",label:"Chapter 6: History, Social Psychiatry and Ethics"}],bof2:[{value:"Chapter 1: Psychiatric Genetics",label:"Chapter 1: Psychiatric Genetics"},{value:"Chapter 2: Epidemiology",label:"Chapter 2: Epidemiology"},{value:"Chapter 3: Advanced Psychology",label:"Chapter 3: Advanced Psychology"},{value:"Chapter 4: Pharmacology",label:"Chapter 4: Pharmacology"},{value:"Chapter 5: Neurosciences",label:"Chapter 5: Neurosciences"}],bof3:[{value:"Chapter 1: General Adult Psychiatry",label:"Chapter 1: General Adult Psychiatry"},{value:"Chapter 2: Forensic and Rehabilitation Psychiatry",label:"Chapter 2: Forensic and Rehabilitation Psychiatry"},{value:"Chapter 3: Child Psychiatry and Learning Disabilities",label:"Chapter 3: Child Psychiatry and Learning Disabilities"},{value:"Chapter 4: Old Age Psychiatry",label:"Chapter 4: Old Age Psychiatry"},{value:"Chapter 5: Substance Use Disorders",label:"Chapter 5: Substance Use Disorders"},{value:"Chapter 6: Organic, Liaison, and Perinatal Psychiatry",label:"Chapter 6: Organic, Liaison, and Perinatal Psychiatry"},{value:"Chapter 7: Psychotherapy",label:"Chapter 7: Psychotherapy"},{value:"Chapter 8: Basic Statistics",label:"Chapter 8: Basic Statistics"}],"600-1":[{value:"Chapter 1",label:"Chapter 1"},{value:"Chapter 2",label:"Chapter 2"},{value:"Chapter 3",label:"Chapter 3"},{value:"Chapter 4",label:"Chapter 4"},{value:"Chapter 5",label:"Chapter 5"}],"600-2":[{value:"Chapter 1",label:"Chapter 1"},{value:"Chapter 2",label:"Chapter 2"},{value:"Chapter 3",label:"Chapter 3"},{value:"Chapter 4",label:"Chapter 4"},{value:"Chapter 5",label:"Chapter 5"}],501:[{value:"Part 1",label:"Part 1"},{value:"Part 2",label:"Part 2"},{value:"Part 3",label:"Part 3"},{value:"Part 4",label:"Part 4"},{value:"Part 5",label:"Part 5"},{value:"Part 6",label:"Part 6"},{value:"Part 7",label:"Part 7"},{value:"Part 8",label:"Part 8"},{value:"Part 9",label:"Part 9"},{value:"Part 10",label:"Part 10"}],prite:[{value:"Part 1",label:"Part 1"},{value:"Part 2",label:"Part 2"},{value:"Part 3",label:"Part 3"},{value:"Part 4",label:"Part 4"},{value:"Part 5",label:"Part 5"},{value:"Part 6",label:"Part 6"},{value:"Part 7",label:"Part 7"},{value:"Part 8",label:"Part 8"},{value:"Part 9",label:"Part 9"},{value:"Part 10",label:"Part 10"},{value:"Part 11",label:"Part 11"},{value:"Part 12",label:"Part 12"}],1200:[{value:"Chapter 1: PSYCHOPATHOLOGY",label:"Chapter 1: PSYCHOPATHOLOGY"},{value:"Chapter 2: SCHIZOPHRENIA",label:"Chapter 2: SCHIZOPHRENIA"},{value:"Chapter 3: MOOD DISORDERS",label:"Chapter 3: MOOD DISORDERS"},{value:"Chapter 4: ANXIETY DISORDERS",label:"Chapter 4: ANXIETY DISORDERS"},{value:"Chapter 5: GERIATRIC PSYCHIATRY",label:"Chapter 5: GERIATRIC PSYCHIATRY"},{value:"Chapter 6: CHILD PSYCHIATRY",label:"Chapter 6: CHILD PSYCHIATRY"},{value:"Chapter 7: CONSULTATION LIAISON PSYCHIATRY",label:"Chapter 7: CONSULTATION LIAISON PSYCHIATRY"},{value:"Chapter 8: FORENSIC PSYCHIATRY",label:"Chapter 8: FORENSIC PSYCHIATRY"},{value:"Chapter 9: SUBSTANCE USE",label:"Chapter 9: SUBSTANCE USE"},{value:"Chapter 10: EATING AND SEXUAL DISORDERS",label:"Chapter 10: EATING AND SEXUAL DISORDERS"},{value:"Chapter 11: MENTAL RETARDATION",label:"Chapter 11: MENTAL RETARDATION"},{value:"Chapter 12: SLEEP DISORDERS",label:"Chapter 12: SLEEP DISORDERS"},{value:"Chapter 13: PERSONALITY DISORDERS",label:"Chapter 13: PERSONALITY DISORDERS"},{value:"Chapter 14: PSYCHOPHARMACOLOGY",label:"Chapter 14: PSYCHOPHARMACOLOGY"},{value:"Chapter 15: PSYCHOTHERAPY",label:"Chapter 15: PSYCHOTHERAPY"},{value:"Chapter 16: PSYCHOLOGY",label:"Chapter 16: PSYCHOLOGY"},{value:"Chapter 17: EMERGENCY PSYCHIATRY",label:"Chapter 17: EMERGENCY PSYCHIATRY"},{value:"Chapter 18: NEUROLOGY",label:"Chapter 18: NEUROLOGY"},{value:"Chapter 19: MISCELLANEOUS QUESTIONS",label:"Chapter 19: MISCELLANEOUS QUESTIONS"}],gt1:[{value:"Basic psychological processes",label:"Basic psychological processes"},{value:"Learning theory and personality",label:"Learning theory and personality"},{value:"Human development",label:"Human development"},{value:"Social psychology and basic psychological treatments",label:"Social psychology and basic psychological treatments"},{value:"Descriptive psychopathology",label:"Descriptive psychopathology"},{value:"Psychopharmacology: antidepressants and anxiolytics",label:"Psychopharmacology: antidepressants and anxiolytics"},{value:"Psychopharmacology: antipsychotics and organic disorders",label:"Psychopharmacology: antipsychotics and organic disorders"},{value:"Clinical psychiatry 1",label:"Clinical psychiatry 1"},{value:"Clinical psychiatry 2",label:"Clinical psychiatry 2"},{value:"Clinical psychiatry 3",label:"Clinical psychiatry 3"},{value:"Clinical psychiatry 4",label:"Clinical psychiatry 4"},{value:"Clinical psychiatry 5",label:"Clinical psychiatry 5"}],gt2:[{value:"Advanced psychological processes and treatments 1",label:"Advanced psychological processes and treatments 1"},{value:"Advanced psychological processes and treatments 2",label:"Advanced psychological processes and treatments 2"},{value:"Advanced psychology, pharmacology and treatments",label:"Advanced psychology, pharmacology and treatments"},{value:"Neurosciences",label:"Neurosciences"},{value:"Genetics and basic neurosciences",label:"Genetics and basic neurosciences"},{value:"Psychopharmacology",label:"Psychopharmacology"},{value:"Epidemiology",label:"Epidemiology"}],gt3:[{value:"General adult psychiatry 1",label:"General adult psychiatry 1"},{value:"General adult psychiatry 2",label:"General adult psychiatry 2"},{value:"Old age psychiatry",label:"Old age psychiatry"},{value:"Addiction psychiatry and forensic psychiatry",label:"Addiction psychiatry and forensic psychiatry"},{value:"Child and adolescent psychiatry and learning disability",label:"Child and adolescent psychiatry and learning disability"},{value:"Research methods, evidence-based practice, statistics and critical appraisal 1",label:"Research methods, evidence-based practice, statistics and critical appraisal 1"},{value:"Research methods, evidence-based practice, statistics and critical appraisal 2",label:"Research methods, evidence-based practice, statistics and critical appraisal 2"}],spmm:[{value:"Basic Psychology",label:"Basic Psychology"},{value:"Social Psychology",label:"Social Psychology"},{value:"Sociocultural Psychiatry",label:"Sociocultural Psychiatry"},{value:"Human Development",label:"Human Development"},{value:"Neuroanatomy",label:"Neuroanatomy"},{value:"Neuroaphysiology",label:"Neuroaphysiology"},{value:"Neurochemistry",label:"Neurochemistry"},{value:"Molecular Genetics",label:"Molecular Genetics"},{value:"Neuropathology",label:"Neuropathology"},{value:"Applied Neurosciences",label:"Applied Neurosciences"},{value:"Basic Pharmacology",label:"Basic Pharmacology"},{value:"Pharmacokinetics",label:"Pharmacokinetics"},{value:"Pharmacodynamics",label:"Pharmacodynamics"},{value:"Adverse Effects",label:"Adverse Effects"},{value:"Classification",label:"Classification"},{value:"Clinical Examination",label:"Clinical Examination"},{value:"Descriptive Psychopathology",label:"Descriptive Psychopathology"},{value:"Dynamic Psychopathology",label:"Dynamic Psychopathology"},{value:"Rating scales",label:"Rating scales"},{value:"2016 paper 1",label:"2016 paper 1"},{value:"2016 paper 2",label:"2016 paper 2"},{value:"2016 Additional",label:"2016 Additional"},{value:"2017 paper 1",label:"2017 paper 1"},{value:"2017 paper 2",label:"2017 paper 2"},{value:"2018 paper 1",label:"2018 paper 1"},{value:"2018 paper 2",label:"2018 paper 2"},{value:"2019 paper 1",label:"2019 paper 1"},{value:"2019 paper 2",label:"2019 paper 2"},{value:"2020 paper 1",label:"2020 paper 1"},{value:"2020 paper 2",label:"2020 paper 2"},{value:"2021 paper 1",label:"2021 paper 1"},{value:"2021 paper 2",label:"2021 paper 2"},{value:"2021 Additional",label:"2021 Additional"}],ghazi:[{value:"Part 1",label:"Part 1"},{value:"Part 2",label:"Part 2"},{value:"Part 3",label:"Part 3"},{value:"Part 4",label:"Part 4"},{value:"Part 5",label:"Part 5"},{value:"Part 6",label:"Part 6"}],focus:[{value:"Part 1",label:"Part 1"},{value:"Part 2",label:"Part 2"},{value:"Part 3",label:"Part 3"},{value:"Part 4",label:"Part 4"}],apa:[{value:"Psychiatric Interview and Mental Status Examination",label:"Psychiatric Interview and Mental Status Examination"},{value:"DSM-5 as a Framework for Psychiatric Diagnosis",label:"DSM-5 as a Framework for Psychiatric Diagnosis"},{value:"Psychological Assessment",label:"Psychological Assessment"},{value:"Laboratory Testing and Imaging Studies in Psychiatry",label:"Laboratory Testing and Imaging Studies in Psychiatry"},{value:"Normal Child and Adolescent Development",label:"Normal Child and Adolescent Development"},{value:"Clinical Issues in Psychiatry and the Law",label:"Clinical Issues in Psychiatry and the Law"},{value:"Ethical Aspects of Clinical Psychiatry",label:"Ethical Aspects of Clinical Psychiatry"},{value:"Neurodevelopmental Disorders",label:"Neurodevelopmental Disorders"},{value:"Schizophrenia Spectrum and Other Psychotic Disorders",label:"Schizophrenia Spectrum and Other Psychotic Disorders"},{value:"Bipolar and Related Disorders",label:"Bipolar and Related Disorders"},{value:"Depressive Disorders",label:"Depressive Disorders"},{value:"Anxiety Disorders",label:"Anxiety Disorders"},{value:"Obsessive-Compulsive and Related Disorders",label:"Obsessive-Compulsive and Related Disorders"},{value:"Trauma- and Stressor-Related Disorders",label:"Trauma- and Stressor-Related Disorders"},{value:"Dissociative Disorders",label:"Dissociative Disorders"},{value:"Somatic Symptom and Related Disorders",label:"Somatic Symptom and Related Disorders"},{value:"Feeding and Eating Disorders",label:"Feeding and Eating Disorders"},{value:"Elimination Disorders",label:"Elimination Disorders"},{value:"Sleep-Wake Disorders",label:"Sleep-Wake Disorders"},{value:"Sexual Dysfunctions",label:"Sexual Dysfunctions"},{value:"Gender Dysphoria",label:"Gender Dysphoria"},{value:"Disruptive, Impulse-Control, and Conduct Disorders",label:"Disruptive, Impulse-Control, and Conduct Disorders"},{value:"Substance-Related and Addictive Disorders",label:"Substance-Related and Addictive Disorders"},{value:"Neurocognitive Disorders",label:"Neurocognitive Disorders"},{value:"Personality Disorders",label:"Personality Disorders"},{value:"Paraphilic Disorders",label:"Paraphilic Disorders"},{value:"Psychopharmacology",label:"Psychopharmacology"},{value:"Brain Stimulation Therapies",label:"Brain Stimulation Therapies"},{value:"Brief Psychotherapies",label:"Brief Psychotherapies"},{value:"Psychodynamic Psychotherapy",label:"Psychodynamic Psychotherapy"},{value:"Mentalizing in Psychotherapy",label:"Mentalizing in Psychotherapy"},{value:"Cognitive-Behavior Therapy",label:"Cognitive-Behavior Therapy"},{value:"Supportive Psychotherapy",label:"Supportive Psychotherapy"},{value:"Treatment of Children and Adolescents",label:"Treatment of Children and Adolescents"},{value:"Treatment of Seniors",label:"Treatment of Seniors"},{value:"Treatment of Culturally Diverse Populations",label:"Treatment of Culturally Diverse Populations"},{value:"Treatment of Lesbian, Gay, Bisexual, and Transgender Patients",label:"Treatment of Lesbian, Gay, Bisexual, and Transgender Patients"},{value:"Treatment of Women",label:"Treatment of Women"}],pretest:[{value:"Evaluation, Assessment, and Diagnosis",label:"Evaluation, Assessment, and Diagnosis"},{value:"Human Behavior: Theories of Personality and Development",label:"Human Behavior: Theories of Personality and Development"},{value:"Human Behavior: Biologic and Related Sciences",label:"Human Behavior: Biologic and Related Sciences"},{value:"Disorders Seen in Childhood and Adolescence",label:"Disorders Seen in Childhood and Adolescence"},{value:"Neurocognitive Disorders and Consultation-Liaison Psychiatry",label:"Neurocognitive Disorders and Consultation-Liaison Psychiatry"},{value:"Schizophrenia and Other Psychotic Disorders",label:"Schizophrenia and Other Psychotic Disorders"},{value:"Psychotherapies",label:"Psychotherapies"},{value:"Mood Disorders",label:"Mood Disorders"},{value:"Anxiety, Obsessive-Compulsive, Trauma",label:"Anxiety, Obsessive-Compulsive, Trauma"},{value:"Personality Disorders, Human Sexuality",label:"Personality Disorders, Human Sexuality"},{value:"Substance-Related Disorders",label:"Substance-Related Disorders"},{value:"Psychopharmacology and Other Somatic Therapies",label:"Psychopharmacology and Other Somatic Therapies"},{value:"Law and Ethics in Psychiatry",label:"Law and Ethics in Psychiatry"}]},r=async(C,e)=>{var s;D.value=!0,q("chapter_click",{event_category:"interaction",event_label:"Chapter Selected",value:((s=n.authStore.record)==null?void 0:s.name)+e});try{const m=await n.collection("mcqs").getFullList({filter:`book = "${C}" && chapter = "${e}"`,sort:"number"});d.value=m}catch(m){console.error("Error loading questions data:",m),d.value={}}D.value=!1},_=R(()=>i.selectedBook==="bof1"?"Best Of Five 1: 450 MCQ":i.selectedBook==="bof2"?"Best Of Five 2: 455 MCQ":i.selectedBook==="bof3"?"Best Of Five 3: 450 MCQ":i.selectedBook==="600-1"?"600 Paper 1: 634 MCQ":i.selectedBook==="600-2"?"600 Paper 2: 665 MCQ":i.selectedBook==="501"?"501 Psychopharmacology: 566 MCQ":i.selectedBook==="spmm"?"SPMM: 2375 MCQ":i.selectedBook==="gt1"?"Get Through Paper 1: 640 MCQ":i.selectedBook==="gt2"?"Get Through Paper 2: 350 MCQ":i.selectedBook==="gt3"?"Get Through Paper 3: 387 MCQ":i.selectedBook==="focus"?"Focus Psychiatry Review: 500 MCQ ":i.selectedBook==="pretest"?"Pretest Psychiatry: 400 MCQ ":i.selectedBook==="1200"?"Psychiatry 1200: 1170 MCQ ":i.selectedBook==="apa"?"APA: 500? MCQ ":"Dr.Ghazi Telegram Group : 296 MCQ"),k=()=>{window.scrollTo({top:0,behavior:"smooth"})};return(C,e)=>{var s,m;return l(),o(O,null,[a("div",null,[a("h5",null,w(_.value),1),T(a("select",{name:"select","aria-label":"Select",required:"",class:"primary","onUpdate:modelValue":e[0]||(e[0]=y=>U(h)?h.value=y:h=y),onChange:e[1]||(e[1]=y=>r(C.selectedBook,u(h)))},[e[2]||(e[2]=a("option",{selected:"",disabled:"",value:""},"Select Chapter",-1)),(l(!0),o(O,null,$(c[C.selectedBook]||[],y=>(l(),o("option",{key:y.value,value:y.value},w(y.label),9,_a))),128))],544),[[Z,u(h)]]),D.value?(l(),o("article",ka,"Loading...")):u(d)&&Object.keys(u(d)).length>0&&C.selectedBook&&!C.editing?(l(),N(ta,{key:JSON.stringify(((s=u(d)[0])==null?void 0:s.question)||""),questionsData:u(d),selectedBook:C.selectedBook,selectedChapter:u(h)},null,8,["questionsData","selectedBook","selectedChapter"])):u(d)&&Object.keys(u(d)).length>0&&C.selectedBook&&C.editing?(l(),N(fa,{key:JSON.stringify(((m=u(d)[0])==null?void 0:m.explanation)||""),questionsData:u(d)},null,8,["questionsData"])):g("",!0)]),a("button",{class:"scroll-to-top",onClick:k},"↑")],64)}}}),wa=H(Sa,[["__scopeId","data-v-bf84d570"]]),Da={key:0,class:"container"},Aa={key:1,class:"container"},Ea={key:2,class:"container"},Oa={class:"questions-container"},Ba={class:"question-text"},Ia={class:"options-list"},$a=["onClick","disabled"],Ra={key:0},Ta={class:"explanation"},Na=["onClick"],La=L({__name:"Flag",setup(E){const n=f([]),i=f([]),d=f(0),h=f(0),D=f(""),c=f(!1),r=M("pb");x(()=>{k()});const _=s=>s==="bof1"?"Best Of Five 1":s==="bof2"?"Best Of Five 2":s==="bof3"?"Best Of Five 3":s==="600-1"?"600 Paper 1":s==="600-2"?"600 Paper 2":s==="501"?"501 Psychopharmacology":s==="spmm"?"SPMM":s==="gt1"?"Get Through Paper 1":s==="gt2"?"Get Through Paper 2":s==="gt3"?"Get Through Paper 3":s==="focus"?"Focus Psychiatry Review ":s==="pretest"?"Pretest Psychiatry ":s==="1200"?"Psychiatry 1200 ":"Dr.Ghazi Telegram Group ",k=async()=>{var s,m;c.value=!0;try{const y=await r.collection("flags").getFirstListItem(`user.id="${(s=r.authStore.record)==null?void 0:s.id}"`,{expand:"mcqs,user"});n.value=(m=y.expand)==null?void 0:m.mcqs,D.value=y.id,i.value=Array(n.value.length).fill(null)}catch(y){console.error("Error fetching questions:",y)}c.value=!1},C=async s=>{var m;try{const y=(m=n.value[s])==null?void 0:m.id;if(!y)throw new Error("MCQ ID is undefined");if(n.value.length===1){await r.collection("flags").delete(D.value),console.log(`Deleted collection with ID: ${D.value}`),n.value=[],i.value=[];return}else await r.collection("flags").update(D.value,{"mcqs-":y}),n.value.splice(s,1),i.value.splice(s,1),console.log(`Deleted MCQ with ID: ${y}`)}catch(y){console.error("Error deleting flagged MCQ:",y)}},e=async(s,m,y,A)=>{i.value[s]===null&&(i.value[s]=y,m===A?d.value+=1:(h.value+=1,n.value[s].showCorrectAnswer=!0))};return(s,m)=>c.value?(l(),o("div",Da,m[0]||(m[0]=[a("article",{"aria-busy":"true"},null,-1)]))):n.value.length?(l(),o("div",Ea,[a("p",null,w(n.value.length>1?n.value.length+" questions":n.value.length+" question"),1),a("div",Oa,[n.value?(l(!0),o(O,{key:0},$(n.value,(y,A)=>(l(),o("div",{key:A,class:"question-card"},[m[3]||(m[3]=a("span",null,"From ",-1)),a("span",null,w(_(y.book))+", "+w(y.chapter),1),m[4]||(m[4]=a("hr",null,null,-1)),a("p",Ba,w(A+1)+" - "+w(y.question),1),a("ul",Ia,[(l(!0),o(O,null,$(y.options,(B,I)=>(l(),o("li",{key:I,class:G(["option",{"correct-option":I===y.correct_answer&&(i.value[A]===B||y.showCorrectAnswer),"incorrect-option":i.value[A]&&I!==y.correct_answer&&i.value[A]===B}]),onClick:z=>e(A,I,B,y.correct_answer),disabled:i.value[A]!==null},w(I)+". "+w(B),11,$a))),128))]),i.value[A]!==null?(l(),o("details",Ra,[m[2]||(m[2]=a("summary",{role:"button",class:"outline secondary"},"Explanation",-1)),a("p",Ta,w(y.explanation),1)])):g("",!0),a("button",{onClick:B=>C(A)},"Delete",8,Na)]))),128)):g("",!0)]),m[5]||(m[5]=a("p",{class:"end"},"End of MCQs",-1))])):(l(),o("div",Aa,m[1]||(m[1]=[a("p",{class:"end"},"There are no flagged questions",-1)])))}}),Ma=H(La,[["__scopeId","data-v-4c31fcfb"]]),Ha={class:"container"},Ya={class:"grid mt-2"},Fa={class:"grid mt-2"},Ga={class:"grid mt-2"},za={key:7,class:"center"},Qa={class:"image-container"},xa=["src"],Ua=L({__name:"Home",emits:["logout"],setup(E,{emit:n}){var k;const i=M("pb");let d=f(""),h=f(!1),D=f(!0);D.value=((k=i.authStore.record)==null?void 0:k.email)==="edit@mcq.com";let c=f(null);const r=C=>{var e;d.value=C,c.value=new URL(Object.assign({"../assets/small/1200.webp":le,"../assets/small/501.webp":se,"../assets/small/600-1.webp":te,"../assets/small/600-2.webp":oe,"../assets/small/apa.webp":re,"../assets/small/bof1.webp":ie,"../assets/small/bof2.webp":ne,"../assets/small/bof3.webp":ce,"../assets/small/flag.webp":ue,"../assets/small/focus.webp":de,"../assets/small/ghazi.webp":pe,"../assets/small/gt1.webp":ve,"../assets/small/gt2.webp":he,"../assets/small/gt3.webp":ye,"../assets/small/pretest.webp":be,"../assets/small/prite.webp":ge,"../assets/small/spmm.webp":me})[`../assets/small/${C}.webp`],import.meta.url).href,window.scrollTo(0,0),q("book_click",{event_category:"interaction",event_label:"Book Selected",value:((e=i.authStore.record)==null?void 0:e.name)+C})},_=()=>{c.value=null,d.value="",h.value=!1};return(C,e)=>(l(),N(ae,{mode:"out-in"},{default:ee(()=>[a("div",Ha,[a("div",Ya,[u(c)?g("",!0):(l(),o("div",{key:0,class:"center",onClick:e[0]||(e[0]=()=>{r("flag"),U(h)?h.value=!0:h=!0})},e[19]||(e[19]=[a("img",{loading:"lazy",src:Ce,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:1,class:"center",onClick:e[1]||(e[1]=s=>r("bof1"))},e[20]||(e[20]=[a("img",{loading:"lazy",src:Pe,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:2,class:"center",onClick:e[2]||(e[2]=s=>r("bof2"))},e[21]||(e[21]=[a("img",{loading:"lazy",src:fe,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:3,class:"center",onClick:e[3]||(e[3]=s=>r("bof3"))},e[22]||(e[22]=[a("img",{loading:"lazy",src:_e,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:4,class:"center",onClick:e[4]||(e[4]=s=>r("600-1"))},e[23]||(e[23]=[a("img",{loading:"lazy",src:ke,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:5,class:"center",onClick:e[5]||(e[5]=s=>r("600-2"))},e[24]||(e[24]=[a("img",{loading:"lazy",src:Se,alt:""},null,-1)])))]),a("div",Fa,[u(c)?g("",!0):(l(),o("div",{key:0,class:"center",onClick:e[6]||(e[6]=s=>r("1200"))},e[25]||(e[25]=[a("img",{loading:"lazy",src:we,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:1,class:"center",onClick:e[7]||(e[7]=s=>r("spmm"))},e[26]||(e[26]=[a("img",{loading:"lazy",src:De,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:2,class:"center",onClick:e[8]||(e[8]=s=>r("gt1"))},e[27]||(e[27]=[a("img",{loading:"lazy",src:Ae,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:3,class:"center",onClick:e[9]||(e[9]=s=>r("gt2"))},e[28]||(e[28]=[a("img",{loading:"lazy",src:Ee,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:4,class:"center",onClick:e[10]||(e[10]=s=>r("gt3"))},e[29]||(e[29]=[a("img",{loading:"lazy",src:Oe,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:5,class:"center",onClick:e[11]||(e[11]=s=>r("pretest"))},e[30]||(e[30]=[a("img",{loading:"lazy",src:Be,alt:""},null,-1)])))]),a("div",null,[a("div",Ga,[u(c)?g("",!0):(l(),o("div",{key:0,class:"center",onClick:e[12]||(e[12]=s=>r("focus"))},e[31]||(e[31]=[a("img",{loading:"lazy",src:Ie,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:1,class:"center",onClick:e[13]||(e[13]=s=>r("501"))},e[32]||(e[32]=[a("img",{loading:"lazy",src:$e,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:2,class:"center",onClick:e[14]||(e[14]=s=>r("apa"))},e[33]||(e[33]=[a("img",{loading:"lazy",src:Re,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:3,class:"center",onClick:e[15]||(e[15]=s=>r("ghazi"))},e[34]||(e[34]=[a("img",{loading:"lazy",src:Te,alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:4,class:"center",onClick:e[16]||(e[16]=s=>r("ghazi"))},e[35]||(e[35]=[a("img",{loading:"lazy",src:"",alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:5,class:"center",onClick:e[17]||(e[17]=s=>r("focus"))},e[36]||(e[36]=[a("img",{loading:"lazy",src:"",alt:""},null,-1)]))),u(c)?g("",!0):(l(),o("div",{key:6,class:"center",onClick:e[18]||(e[18]=s=>r("focus"))},e[37]||(e[37]=[a("img",{loading:"lazy",src:"",alt:""},null,-1)]))),u(c)?(l(),o("div",za,[a("div",Qa,[a("img",{loading:"lazy",src:u(c),alt:"Selected Image"},null,8,xa),a("button",{class:"cancel-button",onClick:_},e[38]||(e[38]=[a("i",{class:"fas fa-times"},null,-1)]))])])):g("",!0)])]),u(h)?(l(),N(Ma,{key:0})):u(d)!==""?(l(),N(wa,{key:1,selectedBook:u(c)?u(d):"",editing:u(D)},null,8,["selectedBook","editing"])):g("",!0)])]),_:1}))}}),Va=H(Ua,[["__scopeId","data-v-10335348"]]);export{Va as default};

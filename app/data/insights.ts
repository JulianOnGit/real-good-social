import { firstSentence, type Block } from './content';

export interface Insight {
  slug: string;
  title: string;
  category: string;
  /** Listing text; defaults to the first sentence of the body. */
  summary?: string;
  /** Short statement of the argument, used when the insight is featured on the homepage. */
  standfirst?: string;
  /** Defaults to {@link DEFAULT_AUTHOR}. */
  author?: InsightAuthor;
  /** Publication date as displayed, e.g. "30 June 2026". */
  date?: string;
  /** Date of the last material revision, in the same format; omit for minor edits. */
  updated?: string;
  body: Block[];
}

export interface InsightAuthor {
  name: string;
  role: string;
}

/** The publication identity every insight is issued under. */
export const PUBLICATION = 'Real Good Insights';

export const DEFAULT_AUTHOR: InsightAuthor = {
  name: 'Julian Knowles',
  role: 'Founder, Real Good Social',
};

export function insightAuthor(insight: Insight): InsightAuthor {
  return insight.author ?? DEFAULT_AUTHOR;
}

/** ISO date (YYYY-MM-DD) for a display date like "30 June 2026", for <time> and structured data. */
export function isoDate(display: string): string | undefined {
  const parsed = new Date(`${display} UTC`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10);
}

/**
 * Filter topics on the Insights page. An insight appears under a topic when its
 * category mentions it (e.g. "Measurement & Agency" under both Measurement and
 * Agency); topics no insight mentions are hidden.
 */
export const INSIGHT_TOPICS = [
  'Community',
  'Agency',
  'Social Infrastructure',
  'Systems',
  'Measurement',
  'Organisations',
  'Research',
];

export function hasTopic(insight: Insight, topic: string): boolean {
  return insight.category.toLowerCase().includes(topic.toLowerCase());
}

export function insightSummary(insight: Insight): string {
  return insight.summary ?? firstSentence(insight.body);
}

/** Estimated reading time in whole minutes, at roughly 230 words a minute. */
export function readingMinutes(insight: Insight): number {
  const text = insight.body
    .map((b) =>
      typeof b === 'string'
        ? b
        : 'list' in b
          ? b.list.join(' ')
          : 'items' in b
            ? b.items.map((i) => `${i.title} ${i.text}`).join(' ')
            : b.callout,
    )
    .join(' ');
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 230));
}

export const insights: Insight[] = [
  {
    slug: "community-capabilities-through-participation",
    title: "What capabilities does a community build through engagement and participation?",
    category: "Community & Capability",
    summary:
      'A community may accumulate capabilities that are not visible in attendance figures alone: knowledge of who can do what, trusted relationships, coordination capacity and the ability to initiate activity independently.',
    standfirst:
      'Participation can leave a community with more than stronger relationships. It can also build shared knowledge, coordination capacity and the ability to initiate activity without relying on a central organiser.',
    date: '30 June 2026',
    body: [
      "I became interested in this question because the usual measures of community activity tell us surprisingly little about what a community has become capable of doing. Attendance, membership, retention and frequency of participation are useful indicators of activity, but they are not measures of collective capability. A community can attract large numbers of people while remaining heavily dependent on a small number of organisers, poor at circulating knowledge, and unable to initiate much beyond its established programme.",
      "Repeated participation can nevertheless produce changes that are structurally important. People learn who has particular knowledge, who is dependable, who has access to particular institutions, who can organise, who is willing to contribute, and who shares an interest in a particular problem. Relationships develop, but so does practical knowledge of the network itself. The community begins to acquire a form of distributed social memory: not a formal database of capabilities, but an increasingly usable understanding of where knowledge, support, initiative and connection reside.",
      "Some of the resulting capabilities belong primarily to individuals. A participant may gain confidence, learn a skill, become more familiar with an institution, or discover an opportunity. Other capabilities are difficult to attribute to any one person. A group may become able to convene around a problem at short notice because relationships already exist. A newcomer may be connected to relevant expertise because several members know enough about one another to make an appropriate introduction. An activity may continue without central coordination because organisational knowledge has diffused through the group.",
      "That distinction matters to me because it suggests that participation can change not only people but the structure within which future action occurs. The community may become better able to mobilise knowledge, provide informal support, coordinate activity, identify relevant expertise, maintain external relationships or generate projects of its own. These are collective capabilities in the practical sense that they depend upon relations among participants and would disappear, or at least become materially harder to exercise, if those relations did not exist.",
      "It also complicates the idea that more participation is automatically better. Different forms of participation are likely to generate different capabilities. A large public event may produce many weak connections but little continuity. A recurring working group may build substantial trust and coordination capacity among a smaller number of people. A highly cohesive community may become excellent at internal support while developing few external relationships. Participation should therefore be examined not only in terms of quantity but in terms of what kinds of social structure it produces.",
      "For Real Good Communities, this changes the measurement problem. I want to know whether people attend and whether they find participation worthwhile, but I also want to understand whether the network becomes more capable over time. Are more people able to initiate activities? Is relevant knowledge easier to locate? Do participants begin forming collaborations independently? Does support become less dependent on a small number of central figures? Are connections with external organisations becoming durable rather than episodic?",
      "These questions imply a different conception of community development. The objective is not to optimise every relationship for productivity, nor to treat informal social life as a means to organisational ends. It is to recognise that communities can accumulate forms of capability that are consequential in their own right and that conventional participation metrics do not necessarily capture.",
      "The empirical question is therefore not simply whether engagement is beneficial. It is which capabilities emerge through different forms of participation, how those capabilities are distributed across a network, how durable they are, and what forms of community design make them more or less likely to develop.",
      "That is the question I want Real Good Communities to help answer.",
    ],
  },
  {
    slug: "more-capacity-for-good-than-institutions-can-use",
    title: "There is more capacity for good than our institutions know how to use",
    category: "Social Systems",
    body: [
      "A substantial amount of social-good activity begins from an assumption of scarcity: insufficient funding, insufficient expertise, insufficient organisational capacity, insufficient people willing to contribute. Those constraints are often real. But I have become increasingly interested in a different form of scarcity: situations in which relevant capabilities already exist but remain inaccessible to one another.",
      "Canberra makes this particularly visible. It contains dense concentrations of expertise in government, policy, technology, research, community services, law, health, education, business and civil society. Many people also have substantial capabilities that sit outside their formal employment: lived knowledge, specialist interests, community relationships, creative skills, technical ability or simply a willingness to contribute to work they consider worthwhile.",
      "The existence of those capabilities does not make them practically available. They are distributed across organisations, professions and social networks that expose only a small portion of what they contain. A community organisation may recognise a problem that could be addressed technologically while having no relationship with anyone capable of building the relevant system. A public servant may understand an institutional constraint that would materially alter how an outside organisation designs an intervention, but there may be no ordinary channel through which that knowledge becomes available. Someone with relevant expertise may be willing to contribute while having little visibility of where their contribution would be useful.",
      "In those situations, the constraint is not capability in the aggregate. It is reachability.",
      "This distinction matters because it changes the range of plausible interventions. If a capability genuinely does not exist, it must be developed or acquired. If it exists but cannot be found, the problem may be discovery. If it can be found but cannot be accessed, the problem may concern institutional boundaries, trust, incentives or cost. If several capabilities are individually accessible but difficult to combine, the problem becomes one of coordination.",
      "Treating all of these as shortages risks producing unnecessary duplication. New organisations, programmes and platforms can be created to reproduce capabilities that already exist elsewhere but are poorly connected to the people who need them. In some cases that duplication is justified; institutional boundaries frequently exist for good reasons. But it should at least be possible to ask whether the missing capacity really needs to be produced again or whether the more useful intervention is to improve access to what is already present.",
      "This is one reason I am interested in Real Good operating across communities, technology, ventures and organisational systems. These are not interchangeable activities, but each can affect the reachability of capability in a different way. Communities can expose knowledge and relationships that organisational directories cannot. Technology can make resources, opportunities and expertise easier to discover. Partnerships can provide stable channels across institutional boundaries. A venture can give continuity and accountability to a combination of capabilities that would otherwise remain informal.",
      "There are obvious limits to this argument. Expertise cannot always be transferred casually between contexts. People have finite time. Institutions have legitimate restrictions on information, authority and responsibility. A network that makes capabilities more visible can also create demands on people who were never resourced to meet them. Better connectivity does not remove the need for specialised organisations or dedicated capacity.",
      "The useful claim is narrower: before assuming that a socially valuable capability is absent, it is worth asking whether it may instead be inaccessible, undiscoverable or difficult to combine with other necessary capabilities.",
      "For Real Good, that creates an important line of inquiry. How much additional capacity for good could be created without inventing anything fundamentally new, simply by making existing knowledge, relationships, resources and abilities easier to reach from the places where they can be useful?",
    ],
  },
  {
    slug: "social-good-orchestration-problem",
    title: "Social good often has an orchestration problem",
    category: "Coordination",
    body: [
      "Some social opportunities fail for reasons that are relatively easy to identify: there is no viable intervention, the required resources do not exist, or the incentives of the relevant actors are incompatible. Others are more puzzling. The knowledge exists, capable people are available, resources can in principle be found, and several organisations may even agree that the problem matters, yet the pieces never form a coherent activity.",
      "I use *orchestration* to describe part of what is missing in those situations.",
      "The term is useful because coordination can sound narrower than the problem actually is. The work may begin well before anyone is scheduling meetings or allocating tasks. Somebody has to recognise that capabilities held in different places are complementary. Different actors may need a shared representation of the problem. Professional vocabularies have to be translated. Responsibilities need to become legible. Someone must maintain continuity through the period in which the collaboration is not yet valuable enough to sustain itself.",
      "Much of this work is difficult to see once a collaboration succeeds because the eventual project becomes the visible object. The introductions, interpretation, trust-building and repeated alignment that made it possible disappear into the background. When the collaboration fails to form, however, the absence of those functions can be decisive.",
      "I do not think the implication is that every ecosystem needs a powerful central coordinator. That would often substitute one bottleneck for another. A system in which all valuable activity depends on a single intermediary may appear well coordinated while remaining structurally fragile.",
      "The more interesting question is how orchestration costs can be reduced.",
      "Existing relationships reduce the work required to establish trust. Shared terminology reduces translation costs. Clear contribution pathways help people identify where their skills might be useful. Reusable contractual, governance or programme structures reduce the institutional effort involved in each new collaboration. Communities can give people enough recurring contact that they recognise complementary interests before a formal project exists.",
      "In this sense, orchestration can sometimes be embedded in infrastructure rather than performed anew for every initiative.",
      "That possibility is relevant to Real Good because many of the capabilities I am interested in are distributed. Real Good is unlikely to possess internally all the expertise, institutional access, lived knowledge, resources and authority needed for the problems it encounters. A more plausible role is to become good at forming useful combinations while avoiding unnecessary ownership of capabilities that are already held effectively elsewhere.",
      "There are also important failure modes. Coordination can become an end in itself. Networks can spend substantial amounts of time convening without producing action. Intermediaries can create dependencies or insert themselves into relationships that would function better directly. The costs of participation can fall disproportionately on community organisations or people providing lived knowledge while larger institutions capture most of the value.",
      "A credible orchestration model therefore needs to demonstrate more than activity. It should reduce the total effort required to form useful collaborations, improve the quality of matching between capabilities and problems, or increase the likelihood that worthwhile work proceeds.",
      "That is what makes orchestration interesting to me as an organisational capability. It is not the ability to sit in the middle of more things. It is the ability to make productive combinations easier to form, including combinations that eventually cease to require the orchestrator.",
    ],
  },
  {
    slug: "social-infrastructure-as-productive-infrastructure",
    title: "Social infrastructure can be productive infrastructure",
    category: "Social Infrastructure",
    body: [
      "I use *social infrastructure* to refer to some of the relationships, routines, shared spaces and connective structures that make certain forms of social action easier to initiate, coordinate and sustain. That includes durable relationships, recurring forums, trusted intermediaries, shared norms, connective institutions, and the practical knowledge that accumulates around who can do what, where relevant resources sit, and how different parts of a community or institutional environment can be reached.",
      "The term is useful because it directs attention away from community as an abstract good and towards the enabling effects of social structure. A community may be experienced as supportive, enjoyable or meaningful, but it may also change the practical conditions under which later activity takes place. People who have met repeatedly may know who has expertise in a particular area, who is prepared to contribute, which organisation has relevant authority, or which pathway is likely to be worth pursuing. That knowledge does not need to be formalised to have operational value. It can reduce search costs, shorten coordination cycles, lower the threshold for asking for help, and make certain forms of collective action more feasible.",
      "This is where the infrastructure analogy becomes analytically useful. Physical and digital infrastructures are generally understood through the activities they enable or make cheaper, more reliable and more widely accessible. Social infrastructure can be examined in comparable terms. A trusted relationship can reduce the cost of coordination. A recurring group can create a stable environment in which capabilities become legible to one another. An intermediary can connect otherwise separate institutional or social domains. A community with persistent internal knowledge may be able to identify relevant expertise or support more quickly than a person beginning from no network at all.",
      "The analogy should not be pushed too far. Social relations are not neutral conduits, and they are not interchangeable with engineered systems. They are contingent, unevenly distributed and shaped by history, trust, power and exclusion. A dense network can still be inaccessible to newcomers. A community can be highly cohesive internally while remaining disconnected from the institutions or resources required to act on what it knows. Informal systems can become dependent on a few highly connected individuals, and apparently strong networks can conceal significant asymmetries in who is heard, who is trusted and who is able to mobilise support.",
      "Those limitations are part of the reason I find the concept useful rather than a reason to discard it. They make social infrastructure something that can be examined more carefully. The relevant questions are not only whether relationships exist, but how capability is distributed across them, whether useful knowledge can travel, whether opportunities are reachable, whether coordination depends on fragile bottlenecks, and whether the network connects effectively to capabilities beyond itself.",
      "This matters for Real Good Communities because many of the outcomes I care about are not exhausted by what happens during a programme or event. Participation can produce immediate value, but it can also change the structure of the network in ways that affect what becomes possible later. A participant may acquire a useful relationship, learn where specialist knowledge sits, become more confident in approaching an organisation, or discover that another person is interested in working on the same problem. None of these outcomes is especially dramatic in isolation. Their significance lies in accumulation.",
      "Over time, those accumulated changes may alter the baseline from which future activity begins. A group that previously required substantial central coordination may become able to organise independently. A person who once had to search widely for advice may know where to look. A new initiative may begin with an existing network of trust rather than with a sequence of cold introductions. A community organisation may gain a direct relationship with an institution that previously sat outside its practical reach.",
      "This suggests that some community outcomes are better understood as changes in **future action capacity** rather than as discrete end states. The immediate outcome of participation may be social connection, learning or support; the longer-term effect may be that later coordination becomes easier, more reliable or less resource-intensive. That distinction is important because conventional programme evaluation can privilege what is visible at the point of delivery and miss the residual capability left behind.",
      "For Real Good, I am interested in whether these residual effects can be identified with enough precision to become part of programme design and measurement. That would require moving beyond broad indicators such as attendance, satisfaction or self-reported engagement and looking instead at questions such as whether participants become better connected to relevant expertise, whether contribution pathways become easier to navigate, whether activities become less dependent on central organisers, whether relationships persist across contexts, and whether the community becomes more effective at connecting people to resources and institutions outside itself.",
      "There is also a stronger organisational implication. If social infrastructure lowers the cost of future coordination, then investing in it may alter the economics of subsequent work. Relationships, shared context, trusted intermediaries and accumulated network knowledge can function as reusable organisational assets. They do not eliminate the need for formal processes, specialist expertise or institutional authority, but they can change how much work is required to bring those capabilities into useful combination.",
      "That is the sense in which I think social infrastructure can be productive infrastructure. The claim is not that all community interaction produces value, or that every relationship should be treated instrumentally. It is that some social structures materially increase the practical capacity available to the people and organisations connected through them. If that proposition holds, then community development is not only about improving present experience. It is also about shaping the conditions under which future action becomes easier to organise, support and sustain.",
    ],
  },
  {
    slug: "measuring-increased-human-agency",
    title: "What changes when we measure increased human agency as an intended programme outcome?",
    category: "Measurement & Agency",
    body: [
      "I became interested in agency as a programme outcome because many familiar measures describe what a programme delivers without describing what changes in the participant’s capacity to act afterwards. A person can receive information, complete a service, report satisfaction and even achieve an immediate outcome while remaining dependent on the same external conditions the next time a similar situation arises.",
      "Agency raises a different question: has the intervention changed the person’s practical ability to influence what happens next?",
      "I use *practical* deliberately. Agency is easy to invoke at a level where it becomes difficult to distinguish from confidence, autonomy or choice. For programme design, I think it needs to be tied to more specific changes. Someone may become better able to understand a situation, identify plausible options, obtain relevant information, navigate an institution, mobilise support, make a decision, initiate an activity or pursue something that was previously outside their effective reach.",
      "Those changes can arise through very different mechanisms. A person may acquire knowledge. A programme may connect them to a relationship they can use later. A barrier may be removed. They may develop a skill. Their understanding of the institutional environment may improve enough that a previously opaque pathway becomes navigable. In each case, the outcome is not merely something the programme has done for them; something has changed in the set of actions they can realistically undertake.",
      "This does not imply that agency should replace other programme outcomes. There are many contexts in which the relevant outcome is appropriately direct: receiving food, securing housing, resolving a legal matter, treating an illness. It would be perverse to treat immediate material outcomes as secondary merely because agency sounds more developmental.",
      "The useful distinction is that some interventions have both a direct outcome and a capability effect. A service may resolve the immediate problem while also leaving the person better able to navigate similar problems in future. A community programme may provide a worthwhile social experience while also making it easier for somebody to find collaborators or contribute to later work. A support intervention may help someone take the next step while improving their ability to identify and assess options independently.",
      "Once agency becomes an explicit intended outcome, programme design has to become more precise about these mechanisms. It is insufficient to state that participants will be “empowered”. We need to specify what they should become more capable of doing and why the intervention is expected to produce that change.",
      "Measurement then becomes less abstract as well. Depending on the programme, we might examine whether participants can identify realistic next steps, reach resources without intensive mediation, navigate relevant systems, initiate activity, exercise greater discretion over decisions, or mobilise relationships and knowledge that were previously unavailable to them.",
      "There is an important methodological difficulty here. Agency is highly context-dependent. A person can have substantial capability in one domain while facing severe constraints in another. Self-reported confidence may improve without corresponding changes in practical possibility, while somebody may become objectively better able to act without describing themselves as more empowered. No single indicator is likely to capture the construct adequately.",
      "For Real Good, this argues for treating agency as a programme-specific capability outcome rather than as a universal score. The relevant question should be grounded in the action environment of the intervention: what should this person become better able to understand, choose, access, initiate or sustain?",
      "I find that formulation useful because it disciplines both design and evaluation. It forces us to move from an attractive value — empowerment — towards a claim that can be examined: **what has changed in the person’s effective capacity to act?**",
    ],
  },
  {
    slug: "are-the-choices-enough-to-increase-agency",
    title: "How do you determine whether the choices available are enough to increase agency?",
    category: "Agency",
    body: [
      "Agency is often associated with choice, but the relationship is less straightforward than it first appears. A person can face a large number of nominal options while having little meaningful ability to pursue any of them. Conversely, a small number of well-supported and genuinely accessible options can sometimes provide considerable scope for self-direction.",
      "The distinction I find useful is between the **availability of an option** and its **effective reachability**.",
      "An option may formally exist but depend on knowledge the person does not have, an application process they cannot navigate, resources they cannot obtain, relationships they lack, or risks they cannot reasonably bear. None of this makes the option unreal in a legal or administrative sense. It does mean that counting it as evidence of agency may substantially overstate the person’s practical freedom.",
      "This becomes clearer when choices are decomposed into their prerequisites. To exercise an option, someone may need to know that it exists, understand what it entails, judge whether it is appropriate, satisfy eligibility or resource requirements, initiate the relevant process, sustain action through uncertainty or delay, and absorb the consequences if the choice does not work as expected. Failure at any one of these points can make an apparently available option practically remote.",
      "I am interested in this because many systems improve nominal choice more readily than effective agency. A service directory can increase the number of options visible to a person without making any of them easier to use. A programme can offer several pathways while leaving the cognitive and administrative burden of navigating them entirely with the participant. An institution can preserve formal discretion while structuring the environment so that only one option is realistically viable.",
      "This suggests that agency is partly relational. It depends not only on attributes of the individual or the number of available alternatives, but on the fit between a person’s capabilities and the demands imposed by the environment.",
      "That has direct implications for Real Good’s support work. Increasing agency may sometimes require creating a new option, but in other cases the stronger intervention is to reduce the distance between a person and an option that already exists. Clarifying information, reducing procedural complexity, providing navigation support, making an introduction, developing a relevant skill or lowering the cost of access can all expand effective choice without increasing the formal number of alternatives.",
      "There is also a boundary to observe. Support that makes choices more accessible can itself become directive. If an organisation simplifies one pathway much more than others, frames information selectively or becomes indispensable to exercising a choice, it may increase action while narrowing autonomy. An agency-oriented design therefore needs to consider both capability and dependence.",
      "The question I want to investigate is consequently more demanding than whether people are offered choices. It is whether the surrounding conditions give them sufficient understanding, capability and access to exercise those choices with meaningful discretion.",
      "That framing is useful because it turns agency from an abstract commitment into a design problem. If we claim that an intervention expands agency, we should be able to identify which options have become more reachable, which constraints have changed, and whether the person has gained greater effective control over what they do next.",
    ],
  },
  {
    slug: "modelling-the-whole-situation",
    title: "What becomes visible when you model the whole situation?",
    category: "Systems",
    body: [
      "The boundaries through which a problem is presented are often inherited from the organisation receiving it. A housing organisation sees housing. An employer sees work. A health service sees health. A financial service sees money. These distinctions are necessary for specialisation, accountability and effective delivery, but they are not necessarily the boundaries that best explain the situation itself.",
      "My interest in modelling the whole situation comes from what happens when those categorical separations are temporarily relaxed.",
      "Several problems that appear independent may turn out to share a common dependency. Financial strain may be downstream of instability in work; difficulty maintaining employment may be affected by housing, care responsibilities or health; failure to engage with support may reflect not a lack of available services but a cumulative administrative burden created by engaging with too many of them simultaneously.",
      "Once those relations are represented, the problem can take on a different structure. What looked like five separate deficits may be better understood as two underlying constraints and several downstream effects. A problem that appeared urgent in one domain may prove difficult to resolve until a prerequisite elsewhere is addressed. An intervention that appears beneficial in isolation may conflict with another requirement in the wider system.",
      "That is the main reason I find whole-situation modelling useful. It does not merely provide a more comprehensive inventory. It can change the causal representation of the problem.",
      "Several types of structure become easier to see. There may be dependencies, where one outcome requires another condition to be established first. There may be feedback loops, where deterioration in one area increases pressure elsewhere and eventually reinforces the original problem. There may be shared constraints, where several outcomes depend on the same missing resource or capability. There may be leverage points, where a relatively small change alters multiple parts of the system.",
      "The approach also has obvious risks. A model can become so expansive that it loses operational usefulness. The desire to understand everything can delay action that is clearly warranted. A modeller can impose causal relationships that are elegant but poorly evidenced. And the person whose situation is being represented may understand priorities differently from the organisation constructing the model.",
      "For that reason, I do not think holistic analysis should imply that every intervention requires an exhaustive theory of the person or system. The value lies in widening the frame enough to identify relationships that materially affect the decision at hand.",
      "This is important to Pathways Support because people dealing with multiple interacting issues are often required to present fragments of their situation repeatedly to organisations whose mandates cover only one part of it. Specialist boundaries remain necessary, but somebody still needs a representation of how those parts fit together if sequencing, trade-offs and dependencies are going to be managed coherently.",
      "The same logic applies beyond individual support. Organisations can optimise their own functions while producing poor outcomes at the boundaries between them. Policy interventions can address visible symptoms without altering the structures generating them. Community programmes can respond to expressed needs without seeing the institutional patterns that repeatedly reproduce those needs.",
      "The question **“What becomes visible when you model the whole situation?”** is therefore not a call for maximal complexity. It is a prompt to test whether the current unit of analysis is concealing relationships that matter to the outcome.",
      "Sometimes it will reveal nothing consequential. Sometimes the existing problem definition will prove adequate. But where the structure changes under a wider view, the intervention should probably change with it.",
    ],
  },
  {
    slug: "one-capability-value-across-an-ecosystem",
    title: "How can one capability create value across an ecosystem?",
    category: "Ecosystems",
    body: [
      "As Real Good has developed as a portfolio rather than a single programme, I have become more attentive to the distinction between an initiative’s direct outputs and the capabilities it leaves available for subsequent work.",
      "A project may be commissioned to produce one thing and still generate several others incidentally. A programme develops a facilitation method. A collaboration establishes a trusted relationship with an institution. A service requires a piece of technology that solves a more general problem. A pilot generates knowledge about participation that becomes relevant to another initiative.",
      "These residual capabilities can have significant organisational value because they change the starting conditions for future work.",
      "The effect is straightforward in principle. If a useful method already exists, it does not need to be rediscovered. If trust has already been established between organisations, the next collaboration can begin further along. If technology has been designed with sufficient generality, a second programme may be able to reuse it. If knowledge has been retained in a form that others can understand, later decisions can draw on evidence rather than institutional memory alone.",
      "This is one of the potential advantages of a portfolio organisation. Capabilities can move laterally between initiatives rather than remaining enclosed within the project that originally financed or developed them.",
      "But there is an important design tension. Reuse can become an excuse for premature standardisation. A tool designed for one context may perform poorly elsewhere. A common platform can impose unnecessary dependencies. An organisation can spend more effort trying to extract synergies than those synergies are worth. The promise that “everything connects” is often more aesthetically satisfying than operationally true.",
      "I therefore think the useful principle is narrower: **preserve optionality for reuse where the cost is justified, but do not require artificial integration.**",
      "That may mean documenting a method rather than converting it immediately into an organisation-wide standard. It may mean maintaining a partnership because it has continuing mutual value, not because every initiative must use it. Shared technology should be modular where feasible, but initiative-specific requirements should remain allowed to diverge.",
      "What matters is that useful capability does not disappear merely because the project that created it has ended.",
      "This also changes how organisational accumulation can be understood. Growth is often described through staff, revenue, programmes or geographic reach. Another form of growth occurs when the organisation acquires a richer stock of relationships, methods, knowledge, technical assets and institutional understanding that makes subsequent work easier or better.",
      "That is the form of accumulation I want Real Good to cultivate deliberately. The objective is not an increasingly complicated internal ecosystem. It is an organisation whose previous work improves the quality and feasibility of what it can attempt next.",
      "The relevant evaluative question is therefore not whether every capability is reused, but whether valuable capabilities remain legible and accessible enough that they can be reused when the opportunity is real.",
    ],
  },
  {
    slug: "community-insight-organisational-blind-spots",
    title: "Using community insight to uncover organisational blind spots",
    category: "Community Insight",
    body: [
      "Organisations inevitably observe the world through interfaces shaped by their own functions. A service sees the people who reach that service. A regulator sees matters represented through its statutory categories. A government programme sees administrative data generated by its processes. A company sees customer behaviour through the transactions and interactions it is equipped to record.",
      "These perspectives can be rigorous and still be incomplete.",
      "I am interested in whether community infrastructure can provide a complementary observational layer. A sufficiently diverse community contains people interacting with institutions, services and social systems from different positions. Their experiences are distributed, often weakly connected and rarely collected in a form that permits comparison.",
      "One participant may repeatedly encounter a particular administrative barrier. Another may understand the organisational reason it exists. Someone else may have seen the same barrier appear in a different context. A fourth may know of an organisation that solved a related problem another way. None of these observations is necessarily significant on its own. Their value may emerge only when they are brought into relation.",
      "This is more demanding than the familiar instruction that organisations should listen to communities. Listening is necessary but does not resolve the epistemic problem.",
      "Community experience is not automatically representative. People interpret events differently. Selection effects influence who participates and who speaks. A compelling story can receive disproportionate weight. An apparent pattern may disappear once administrative data or other evidence is considered. Community knowledge therefore requires synthesis rather than simple aggregation.",
      "For Real Good, I am interested in developing that synthesis as an explicit capability. The process might involve collecting observations, preserving enough context to interpret them properly, identifying recurring patterns, comparing conflicting accounts, testing emerging interpretations against other evidence, and translating the result into a form that organisations can use.",
      "That process also creates a useful distinction between **community voice** and **community insight**. Voice concerns whether people are able to express perspectives and have them heard. Insight requires an additional analytical step: determining what can reasonably be learned from the set of observations and how confident we should be in that conclusion.",
      "Both matter, but they serve different functions.",
      "The potential value for organisations is that community-derived insight may reveal phenomena that are structurally difficult to observe from within formal systems. Problems occurring between services, barriers encountered before somebody becomes a client, unintended effects of administrative processes, or emerging needs that do not yet map cleanly to an institutional category may all be poorly represented in conventional data.",
      "The purpose is not to privilege community knowledge over professional expertise, research or administrative evidence. The stronger model is triangulation. Different sources reveal different parts of the system, and discrepancies between them can be informative in their own right.",
      "This is where I see an important connection between Real Good Communities and the Social Infrastructure Collaborative. A community can create the relational environment through which distributed observations become available. The Collaborative can develop methods for turning those observations into disciplined inquiry.",
      "If that works, community infrastructure could become not only a site of participation but a means of extending what organisations are capable of seeing.",
    ],
  },
  {
    slug: "how-positive-social-change-compounds",
    title: "How positive social change can compound",
    category: "Systems & Growth",
    body: [
      "I use *compounding* cautiously because the language of exponential growth can be imported too casually into social systems. Most positive interventions do not generate self-amplifying returns indefinitely, and social outcomes are constrained by institutions, resources, changing contexts and diminishing effects.",
      "There is nevertheless a narrower phenomenon that I think is worth designing for: some outcomes alter the conditions under which later outcomes are produced.",
      "A participant acquires a skill and later uses it to help somebody else. A programme creates relationships that support another initiative. A community develops organisers who can run activities independently. A partnership creates sufficient trust that a second collaboration requires less negotiation. Research produced for one problem improves decisions elsewhere.",
      "In each case, an outcome has also become an input.",
      "That is the sense in which positive change can compound.",
      "The distinction matters because conventional programme logic often terminates at the intended outcome. A programme produces a benefit, the benefit is measured, and the causal chain effectively ends. But some interventions leave behind capabilities, relationships, knowledge or infrastructure whose effects continue beyond the original delivery period.",
      "This creates a different way to think about durability. A programme does not necessarily need to persist indefinitely for its effects to endure. In some cases, continued dependence on the original programme might indicate that relatively little capability has transferred.",
      "A community initiative that develops competent organisers may eventually need less central facilitation. A support programme that improves navigation capability may reduce a participant’s dependence on future navigation support. An institutional project that changes a recurring process may create value long after the project team has dissolved.",
      "None of these effects should be assumed. Capability can decay. Relationships weaken. Knowledge is lost when people leave. Organisational learning can remain local to a project team rather than becoming embedded in practice. Some forms of support appropriately remain ongoing rather than being designed around eventual independence.",
      "The practical question is therefore which outcomes have a plausible second-order productive effect and whether that effect can be observed.",
      "For Real Good, I am interested in indicators such as participants becoming contributors, contributors becoming organisers, relationships generating further collaborations, project learning being reused, infrastructure serving additional purposes, and institutions changing subsequent practice as a result of what was learned.",
      "These effects matter because they alter the relationship between intervention and capacity. The organisation is no longer producing only a sequence of isolated outcomes; some of those outcomes increase the capabilities available for producing later ones.",
      "That connects several parts of Real Good’s work. Agency matters partly because a person who becomes more capable can act beyond the intervention. Community capability matters because networks can coordinate activity that Real Good does not centrally produce. Social infrastructure matters because accumulated relationships can lower the cost of future action. Organisational learning matters because insight can improve subsequent decisions.",
      "The question I want to retain is therefore relatively concrete:",
      "**What does this work leave behind that can make further good easier to create?**",
      "Sometimes the answer will be nothing beyond the immediate outcome, and that may be entirely appropriate. Where the answer includes durable capability, however, it is worth recognising that as part of the value created.",
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

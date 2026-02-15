export type RegionId = 'north' | 'city' | 'rural' | 'medical';

export interface Choice {
  id: string;
  text: string;
  type: 'tone' | 'action' | 'wallet';
  cost?: number;
  impact: {
    warmth?: number;
    reliability?: number;
    affordability?: number;
    agency?: number;
  };
  nextId?: string;
}

export interface Letter {
  id: string;
  day: string;
  sender: string;
  content: string;
  choices: Choice[];
  walletEvent?: {
    prompt: string;
    options: {
      id: string;
      label: string;
      costLabel: string;
      cost?: number;
      impact: {
        warmth?: number;
        reliability?: number;
        affordability?: number;
        agency?: number;
      };
    }[];
  };
}

export interface ContextCard {
  title: string;
  text: string;
  source: string;
  sourceUrl: string;
}

export interface Takeaway {
  text: string;
}

export interface Region {
  id: RegionId;
  name: string;
  coordinates: { top: string; left: string };
  letters: Letter[];
  themeColor: string;
  budget: number;
  contextCards: ContextCard[];
  takeaways: Takeaway[];
}

export const ALL_SOURCES: { label: string; url: string }[] = [
  { label: 'Canada Energy Regulator — Clean Energy in Remote Communities', url: 'https://www.cer-rec.gc.ca/en/data-analysis/energy-markets/market-snapshots/2023/market-snapshot-clean-energy-projects-remote-indigenous-northern-communities.html' },
  { label: 'Wataynikaneyap Power — Grid Connection Update', url: 'https://www.wataypower.ca/updates/wataynikaneyap-power-completes-construction-of-the-line-that-brings-light' },
  { label: 'Natural Resources Canada — Northern and Remote Communities', url: 'https://natural-resources.canada.ca/science-data/science-research/research-centres/northern-indigenous-rural-remote-communities' },
  { label: 'Statistics Canada — Energy Poverty in Canada', url: 'https://www150.statcan.gc.ca/n1/pub/46-28-0001/2024001/article/00001-eng.htm' },
  { label: 'Canada Energy Regulator — Fuel Poverty Across Canada', url: 'https://www.cer-rec.gc.ca/en/data-analysis/energy-markets/market-snapshots/2017/market-snapshot-fuel-poverty-across-canada-lower-energy-efficiency-in-lower-income-households.html' },
  { label: 'CMHC — Canadian Housing Survey', url: 'https://www.cmhc-schl.gc.ca/observer/2024/2022-canadian-housing-survey' },
  { label: 'Efficiency Canada — Energy Poverty in Canada', url: 'https://www.efficiencycanada.org/energy-poverty-in-canada/' },
  { label: 'Canadian Red Cross — Power Outages', url: 'https://www.redcross.ca/how-we-help/emergencies-and-disasters-in-canada/types-of-emergencies/power-outages' },
  { label: 'Government of Canada — How to Prepare for Power Outages', url: 'https://www.canada.ca/en/services/policing/emergencies/preparedness/get-prepared/hazards-emergencies/power-outages/how-prepare.html' },
  { label: 'Hydro One — Life Support Notification', url: 'https://www.hydroone.com/power-outages-and-safety/life-support-notification' },
];

export const STORIES: Record<RegionId, Region> = {
  north: {
    id: 'north',
    name: 'North',
    coordinates: { top: '66.7%', left: '71.4%' },
    themeColor: 'var(--color-primary)',
    budget: 500,
    contextCards: [
      { title: 'Why power is fragile here', text: 'Many remote and northern communities in Canada are not connected to the main electricity grid and rely on local diesel generators, making power expensive and vulnerable to fuel delivery delays.', source: 'Canada Energy Regulator', sourceUrl: 'https://www.cer-rec.gc.ca/en/data-analysis/energy-markets/market-snapshots/2023/market-snapshot-clean-energy-projects-remote-indigenous-northern-communities.html' },
      { title: 'What grid connection can change', text: 'Indigenous-led grid connection projects have reduced diesel use and improved reliability in some communities, but they take years of planning, funding, and community decision-making.', source: 'Wataynikaneyap Power', sourceUrl: 'https://www.wataypower.ca/updates/wataynikaneyap-power-completes-construction-of-the-line-that-brings-light' },
      { title: 'Why diesel is still used', text: 'Diesel remains common in remote areas because of geography, distance, and the high cost of building transmission lines.', source: 'Natural Resources Canada', sourceUrl: 'https://natural-resources.canada.ca/science-data/science-research/research-centres/northern-indigenous-rural-remote-communities' },
    ],
    takeaways: [
      { text: 'Remote communities often have no choice but to ration power — it is not a personal failing, but a structural gap.' },
      { text: 'Youth like Lusa bear invisible costs: delayed education, lost opportunities, and emotional exhaustion.' },
      { text: 'Grid expansion projects exist, but they take years. In the meantime, communities innovate with what they have.' },
    ],
    letters: [
      {
        id: 'n1',
        day: 'Late Winter \u2014 Iqaluit, Nunavut',
        sender: 'Lusa',
        content: `<p>Hi friend,</p>
        <p>Thanks for your last letter. I really look forward to them; sometimes it feels like I have nobody to talk to. I don\u2019t have many friends in the community since I\u2019m always busy helping my younger siblings with their homework and my parents with the shop.</p>
        <p>Things have been especially hard right now since there\u2019s been a fuel delivery delay due to the icy roads. So for the rest of the week, I only have about one hour of power per day. I can\u2019t help but feel constant anxiety whenever the lights start to flicker or the fridge clicks off. The constant hum of the generator can be grating, but it\u2019s better than the eerie silence when the generator turns off. That sound is\u2026 louder than anything.</p>
        <p>I feel like I\u2019m putting my needs on the back burner. There\u2019s a scholarship application that I really need to finish but I don\u2019t even get the chance because we don\u2019t have stable power, and I\u2019m so busy helping everybody out. I could use more energy but if the fridge heats up too much, we lose some food\u2014 but if I miss the deadline, I lose my chance.</p>
        <p>It\u2019s been\u2026 difficult trying to ration that one hour I have between online school, my siblings, and the shop. How am I ever going to finish my application? My laptop can\u2019t even fully charge. It\u2019s only at 11%. And honestly, so am I. And I can\u2019t even ask my parents to change anything. They\u2019re already working so hard as it is.</p>
        <p>Let me ask you a question:</p>
        <p><em>If you only had one hour of power a day, what would you choose to protect?</em></p>
        <p>From,<br/>Lusa</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Use the hour for the fridge and freezer \u2014 food comes first.',
            type: 'action',
            cost: 0,
            impact: { warmth: 2, reliability: 1, agency: -1 },
            nextId: 'n2'
          },
          {
            id: 'c2',
            text: 'Use the hour for your laptop and hotspot \u2014 finish that application!',
            type: 'action',
            cost: 0,
            impact: { agency: 2 },
            nextId: 'n2'
          },
          {
            id: 'c3',
            text: 'Split the hour between everything \u2014 a little for each.',
            type: 'action',
            cost: 0,
            impact: { warmth: 1, reliability: 1, agency: 1 },
            nextId: 'n2'
          }
        ],
        walletEvent: {
          prompt: "Only one hour of electricity per day until the fuel truck arrives. How do you use it?",
          options: [
            { id: 'fridge', label: 'Fridge and heat \u2014 food stays safe, but schoolwork slips', costLabel: '$0', cost: 0, impact: { warmth: 1, reliability: 1, agency: -1 } },
            { id: 'devices', label: 'Charge devices and submit work \u2014 risk food spoiling', costLabel: '$0', cost: 0, impact: { agency: 1, warmth: -1 } },
            { id: 'split-fuel', label: 'Split the hour and burn extra fuel to stay steady', costLabel: '-$50', cost: 50, impact: { reliability: 1, affordability: -1 } }
          ]
        }
      },
      {
        id: 'n2',
        day: 'Late Winter \u2014 A Few Days Later',
        sender: 'Lusa',
        content: `<p>Hi friend,</p>
        <p>Sorry that this letter is late. I\u2019m still busy juggling everything. Thanks for your advice.</p>
        <p>I had a talk with my parents, and they tried to lighten up my responsibilities. But that doesn\u2019t change the fact that the power is still constantly going out. Everyone in the community is stressed about the situation. When the generator cut out yesterday, you could hear groans and outcries all around us. It\u2019s gotten to the point where I\u2019ve even heard an elder suggest a community energy meeting at the local school gym this weekend to discuss the power delays.</p>
        <p>I think it\u2019s a great idea, but my parents and their friends aren\u2019t so sure. It\u2019s not the first time we\u2019ve had a meeting to talk about the outages and the fuel delays; in fact, we\u2019ve had three meetings in the last two years. But nothing has really changed: letter writing campaigns don\u2019t make the fuel truck move faster, and another meeting will mean lost income for store owners like my parents. And lost income means\u2026 Well, you get the point.</p>
        <p>But I think it\u2019s time that we make a change, and I know I\u2019m not alone. Let me ask you, friend, <em>if you were in my situation, would you speak up or stay silent so that you don\u2019t cause a stir?</em></p>
        <p>From,<br/>Lusa</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Go to the meeting and speak up \u2014 your voice matters.',
            type: 'action',
            cost: 0,
            impact: { agency: 2 },
            nextId: 'n3'
          },
          {
            id: 'c2',
            text: 'Go and listen first \u2014 learn before you lead.',
            type: 'action',
            cost: 0,
            impact: { agency: 1 },
            nextId: 'n3'
          },
          {
            id: 'c3',
            text: 'Skip it to help at the shop \u2014 your family needs you right now.',
            type: 'action',
            cost: 0,
            impact: { affordability: 1 },
            nextId: 'n3'
          }
        ],
        walletEvent: {
          prompt: "Fuel is tight for the next three days; one surprise outage could ruin food.",
          options: [
            { id: 'shelf-food', label: 'Buy shelf-stable food and accept less refrigeration', costLabel: '-$40', cost: 40, impact: { affordability: 1, reliability: -1 } },
            { id: 'power-bank', label: 'Put money toward a small power bank / extra charger', costLabel: '-$80', cost: 80, impact: { agency: 1, affordability: -1 } },
            { id: 'pool-funds', label: 'Pool funds with neighbors for emergency fuel', costLabel: '$0 (Shared cost)', cost: 0, impact: { warmth: 1, reliability: 1 } }
          ]
        }
      },
      {
        id: 'n3',
        day: 'Late Winter \u2014 Weeks Later',
        sender: 'Lusa',
        content: `<p>Hi friend,</p>
        <p>How are you? I hope your view at night is as beautiful as mine. Here, the Aurora paints the skies on cloudless nights. In Iqaluit, my community calls it <em>aqsarniit</em>. I tried to take a picture with my phone to send to you, but my phone battery drains faster in the cold weather.</p>
        <p>You might think that I would get tired of the sight, but the dancing ribbons in the sky take my breath away every time. The energy of the aurora pulses through the community, painting the snow green and filling our people with hope. It almost makes up for the dimness inside our homes. Still, whenever the display is over, and we come back inside to light the lanterns, the house suddenly feels small again.</p>
        <p>I finally finished my scholarship application, and work has eased up a bit. I have more time to help my siblings with their homework and my parents with the shop, but they insist I take more time for myself. Perhaps things are finally looking up.</p>
        <p>I have great news about our community meetings: it appears that our concerns are finally being addressed. I\u2019ve heard radio segments about an ongoing grid expansion. During our last meeting, the chief told us that a transmission line is being built in a nearby region, and that there are talks about a feasibility study.</p>
        <p>There are skeptics, of course\u2014 worries that rates will go up, or that we\u2019ll have to give up something else. But I am full of hope, and can\u2019t wait for the date that we will no longer have to ration our energy. Perhaps it won\u2019t happen before I go off for school, but maybe my younger siblings will get to see that day for themselves.</p>
        <p>Here\u2019s to a brighter future, friend.</p>
        <p><em>If you were in my shoes and a solution existed, what would you demand first for your community?</em></p>
        <p>From,<br/>Lusa</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Ask hard questions \u2014 demand details before getting your hopes up.',
            type: 'action',
            cost: 0,
            impact: { agency: 1, reliability: 1 },
            nextId: undefined
          },
          {
            id: 'c2',
            text: 'Advocate for rate protections \u2014 make sure it\u2019s affordable.',
            type: 'action',
            cost: 0,
            impact: { affordability: 1, agency: 1 },
            nextId: undefined
          },
          {
            id: 'c3',
            text: 'Push for a community benefits agreement \u2014 this should help everyone.',
            type: 'action',
            cost: 0,
            impact: { agency: 2 },
            nextId: undefined
          }
        ]
      }
    ]
  },

  rural: {
    id: 'rural',
    name: 'Rural',
    coordinates: { top: '80.2%', left: '42.8%' },
    themeColor: 'var(--color-chart-3)',
    budget: 900,
    contextCards: [
      { title: 'What energy poverty means', text: 'A household is often considered energy poor if it spends 10% or more of its after-tax income on home energy bills.', source: 'Statistics Canada', sourceUrl: 'https://www150.statcan.gc.ca/n1/pub/46-28-0001/2024001/article/00001-eng.htm' },
      { title: 'Why rural households are hit harder', text: 'Energy poverty rates are higher in some rural and colder regions due to older housing, higher heating needs, and fewer efficiency upgrades.', source: 'Canada Energy Regulator', sourceUrl: 'https://www.cer-rec.gc.ca/en/data-analysis/energy-markets/market-snapshots/2017/market-snapshot-fuel-poverty-across-canada-lower-energy-efficiency-in-lower-income-households.html' },
      { title: 'Housing condition matters', text: 'Older or poorly insulated homes require more energy to stay warm, increasing costs even when households try to conserve.', source: 'CMHC', sourceUrl: 'https://www.cmhc-schl.gc.ca/observer/2024/2022-canadian-housing-survey' },
    ],
    takeaways: [
      { text: 'Seniors on fixed incomes are especially vulnerable when energy costs spike — there is no room in the budget to absorb the shock.' },
      { text: 'Choosing between heat and food is not hypothetical for many rural Canadians. It is a monthly calculation.' },
      { text: 'Aging housing stock creates a compounding problem: the worse the home, the more energy it wastes, and the less the occupant can afford to fix it.' },
    ],
    letters: [
      {
        id: 'r1',
        day: 'Late Winter \u2014 Saskatchewan',
        sender: 'Mary',
        content: `<p>Dear friend,</p>
        <p>How is the weather in your neck of the woods? Please let me know if you received the scarf I sent last week. It is becoming quite frigid in Saskatchewan, and the wind is testing my patience! The draft manages to slip through this seam in the window, no matter how tight I latch it. It is driving me nuts; I have started to tape along the edge, but the draft still gets through. I am sure it is causing strain on my electrical system, and the kettle clicks off before the water is finished boiling\u2014 it takes twice as long to make my morning tea! It must be the old house.</p>
        <p>Now here comes the real zinger\u2014 the darned heating bill! It arrived yesterday, and you wouldn\u2019t believe it: $153 higher than the previous month. I just could not believe it. I read it twice, and then once more, because that is how ridiculous it is. That is more than my groceries cost last week. Now I\u2019m stuck between a rock and a hard place: food or heat. I don\u2019t want to eat less to keep the heat where it is, but that looks like where I am heading. It\u2019s either that or the pipes start to creak.</p>
        <p>Maybe I should just fix the window properly, but that\u2019s not a cost I can pay upfront right now. I can\u2019t do it myself\u2014 the conditions are too dangerous, and the wind doesn\u2019t seem to be calming down soon. What do you think? <em>If you were me, would you keep the heat going or buy groceries?</em></p>
        <p>Sincerely yours,<br/>Mary</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Call SaskPower about the bill \u2014 there might be a payment plan.',
            type: 'action',
            cost: 0,
            impact: { affordability: 1, agency: 1 },
            nextId: 'r2'
          },
          {
            id: 'c2',
            text: 'Turn the heat down and bundle up \u2014 save where you can.',
            type: 'action',
            cost: 0,
            impact: { affordability: 1, warmth: -1 },
            nextId: 'r2'
          },
          {
            id: 'c3',
            text: 'Pay the bill in full and cut back on groceries.',
            type: 'action',
            cost: 0,
            impact: { warmth: 1, affordability: -1 },
            nextId: 'r2'
          }
        ],
        walletEvent: {
          prompt: "Heating bill arrived $153 higher than last month; income is fixed.",
          options: [
            { id: 'heat-down', label: 'Turn heat down and keep groceries steady', costLabel: '$0', cost: 0, impact: { affordability: 1, warmth: -1 } },
            { id: 'keep-heat', label: 'Keep the heat steady and cut back on groceries', costLabel: '-$153', cost: 153, impact: { warmth: 1, affordability: -1 } },
            { id: 'fix-window', label: 'Put a deposit toward fixing the window', costLabel: '-$100', cost: 100, impact: { reliability: 1, affordability: -1 } }
          ]
        }
      },
      {
        id: 'r2',
        day: 'Late Winter \u2014 The Following Week',
        sender: 'Mary',
        content: `<p>Dear friend,</p>
        <p>I am glad you received my scarf! Now you can stay fashionable and warm. The cold here is not as biting at present. It is more of a damp, lingering presence that I can smell throughout the house. It feels like the walls are sweating with condensation, and that my laundry never fully dries. I try to mask the smell of mildew with air fresheners, but I fear that makes it worse.</p>
        <p>You know that drafty window I was talking about? Well, I just couldn\u2019t take it anymore. I need to get it fixed. I would call my son to help, but he lives in the city; instead, I put in a call to inquire about repairs. And it is just as I feared; the contractor confirmed that the seal on the window is gone. The number he quoted me was\u2026 much too high. My pension for the month is not even enough to pay for repairs. Maybe next winter.</p>
        <p>I am not sure if I asked before\u2014 do you live in a house or an apartment? Maybe even your childhood home? I have been thinking a lot about what home means. I believe that many people attach the concept of home to a physical location; I know I have. I love this house, and my family has lived here for many years. But as I get older, it becomes more difficult to manage. I am worried my home is slipping away from me, and what is left in its place is an aging structure that is slowly giving up and withering away. It used to feel warmer. It used to feel safer. I am doing the best I can, but it is never enough. Perhaps memory isn\u2019t a good enough reason to hold on anymore.</p>
        <p>I know it might sound like I am complaining a lot, but I think I am just tired. <em>Who do I turn to? What do I prioritize?</em> I\u2019m embarrassed, and I don\u2019t want to feel like a burden, but I really do need the help. What is your opinion?</p>
        <p>Sincerely yours,<br/>Mary</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Get a second quote \u2014 that price might not be the only option.',
            type: 'action',
            cost: 0,
            impact: { affordability: 1, agency: 1 },
            nextId: 'r3'
          },
          {
            id: 'c2',
            text: 'Ask about a partial repair \u2014 something is better than nothing.',
            type: 'action',
            cost: 0,
            impact: { reliability: 1, affordability: 1 },
            nextId: 'r3'
          },
          {
            id: 'c3',
            text: 'Talk to your son about your options \u2014 you don\u2019t have to do this alone.',
            type: 'tone',
            cost: 0,
            impact: { agency: 1 },
            nextId: 'r3'
          }
        ],
        walletEvent: {
          prompt: "Forecast is below freezing; outage risk is high tonight.",
          options: [
            { id: 'blankets', label: 'Buy extra blankets, thermal socks, and hand warmers', costLabel: '-$50', cost: 50, impact: { warmth: 1, affordability: -1 } },
            { id: 'check-in', label: 'Ask a neighbor or your son to do a check-in and help', costLabel: '$0', cost: 0, impact: { reliability: 1, agency: -1 } },
            { id: 'conserve', label: 'Do nothing now and conserve money', costLabel: '$0', cost: 0, impact: { affordability: 1, reliability: -1 } }
          ]
        }
      },
      {
        id: 'r3',
        day: 'Late Winter \u2014 After Dinner',
        sender: 'Mary',
        content: `<p>Dear friend,</p>
        <p>Forgive me if I sound frantic\u2014 the power just went out after dinner. I blinked, and the stove clock was suddenly missing. The power has been gone for hours, and it has not come back yet. Consequently, I decided to write you a letter to calm myself down. The silence that comes during an outage can be peaceful, but also slightly unnerving. All the background noise that you become accustomed to cuts out in an instant, and you are only left with the thoughts you have to fill your head. Ever since my husband passed away, such silence has become nearly unbearable. It is never nice to feel alone; I am grateful to have your friendship.</p>
        <p>I called SaskPower, our utility provider, to ask about the outage. They don\u2019t know how long it will be, and told me I might need to buckle in for a while longer. I have candles and layers to keep me warm, but I am worried that the pipes could burst if it drops below freezing outside. On the other hand, my grocery stash is slowly withering away in the fridge. I am considering moving it all outside, but I have a weak hip and am scared of falling over or straining something. So I keep going over the calculations in my head, trying to figure out how many hours I have left before I need to decide.</p>
        <p>Some bright news\u2014 my son brought my granddaughter over last week. Her smile is just precious, and her energy is infectious. I\u2019ll have to send you some pictures of my family when I get the chance. Regrettably, I could not focus for most of their visit since I was too worried about the draft and all of the repairs that needed to be done.</p>
        <p>I\u2019ll get through this. It is not the first time I\u2019ve fallen on hard times, and I\u2019ve certainly handled worse. But I am so tired of being the person who handles it all. Tonight, I don\u2019t want to be brave. I just want the lights to come back on.</p>
        <p>That being said, it\u2019s always good to be prepared. I\u2019m thinking of putting together a two-day kit that would prepare me for power outage emergencies like this. Let me ask you for your opinion \u2014 <em>if you only had a little money to prepare for two days without power, what would you pack in your kit?</em></p>
        <p>Sincerely yours,<br/>Mary</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Protect the pipes first \u2014 a burst pipe would be devastating.',
            type: 'action',
            cost: 0,
            impact: { reliability: 1, warmth: 1 },
            nextId: undefined
          },
          {
            id: 'c2',
            text: 'Save the food \u2014 ask a neighbor for help moving it.',
            type: 'action',
            cost: 0,
            impact: { agency: 1 },
            nextId: undefined
          },
          {
            id: 'c3',
            text: 'Take care of yourself first \u2014 rest, warmth, and layers.',
            type: 'action',
            cost: 0,
            impact: { warmth: 2 },
            nextId: undefined
          }
        ]
      }
    ]
  },

  city: {
    id: 'city',
    name: 'Urban',
    coordinates: { top: '93.6%', left: '62.9%' },
    themeColor: 'var(--color-accent)',
    budget: 1300,
    contextCards: [
      { title: 'Renters and energy burden', text: 'Energy poverty is influenced by housing quality and lack of control over upgrades, which can increase costs for renters.', source: 'Efficiency Canada', sourceUrl: 'https://www.efficiencycanada.org/energy-poverty-in-canada/' },
      { title: 'How energy poverty is measured', text: 'Different thresholds, such as 6% or 10% of income spent on energy, change how many households are considered energy poor.', source: 'Statistics Canada', sourceUrl: 'https://www150.statcan.gc.ca/n1/pub/46-28-0001/2024001/article/00001-eng.htm' },
      { title: 'Outages in high-rise buildings', text: 'In high-rise buildings, outages can disable elevators, heating, refrigeration, and medical equipment simultaneously.', source: 'Canadian Red Cross', sourceUrl: 'https://www.redcross.ca/how-we-help/emergencies-and-disasters-in-canada/types-of-emergencies/power-outages' },
    ],
    takeaways: [
      { text: 'Renters often cannot control the quality of their housing or electrical systems — yet they bear the consequences of failure.' },
      { text: 'Medical dependency on electricity turns every outage into a potential emergency, adding invisible stress to daily life.' },
      { text: 'Falling behind on utility bills can start a cycle that is very difficult to escape, especially when essential costs keep rising.' },
    ],
    letters: [
      {
        id: 'u1',
        day: 'Late Winter \u2014 Toronto, Ontario',
        sender: 'Vihaan',
        content: `<p>Hey there,</p>
        <p>How\u2019s it going? Hope you and your family are doing well. Thanks for the care package! My mom loves the snacks that you sent. Trust me, she really needed the pick-me-up. Remember how I was talking about my old apartment building here in Toronto? Well, we\u2019ve been having a lot more power outages recently due to the bad storms.</p>
        <p>The power went out again last night, and it\u2019s making us both nervous. My mom sleeps with an electrical medical device at night, and we\u2019re both scared that an outage is going to hit at a bad moment. The machine has a battery, but it doesn\u2019t last very long, and it\u2019s slowly dying. It only takes one bad night for things to turn south, y\u2019know?</p>
        <p>Not to mention how annoying the outages are. It\u2019s not like I can just ignore them and go about my day. Last week, I came home from work and got stuck in the elevator. Legit, it stopped between the eighth and the ninth floor and then went silent. I almost peed my pants\u2014 I felt like I was in a horror movie! I am pretty sure the kid next to me did. We were only stuck in there for about forty minutes before the fire department came, but it spooked the whole building. Everybody has been avoiding them all week.</p>
        <p>Maybe it\u2019s because I\u2019m young, but all my neighbours keep coming by to ask me questions about the outages. Do I know how long the outages are going to last? Are the elevators safe? I keep telling them I do not know, but I\u2019ve been calling the building super and emailing them, but they don\u2019t even answer. I\u2019m thinking of making emergency plans\u2014 try to find someone to take over my lease, pack our bags, and make some calls. Rent in Toronto is super expensive, so the sooner I start the better.</p>
        <p><em>What would you do first?</em></p>
        <p>Best,<br/>Vihaan</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Report it in writing and document everything \u2014 create a paper trail.',
            type: 'action',
            cost: 0,
            impact: { agency: 1, reliability: 1 },
            nextId: 'u2'
          },
          {
            id: 'c2',
            text: 'Get a backup battery or UPS for the medical device \u2014 that\u2019s the priority.',
            type: 'action',
            cost: 0,
            impact: { warmth: 2, reliability: 1, affordability: -1 },
            nextId: 'u2'
          },
          {
            id: 'c3',
            text: 'Organize your neighbors to escalate together \u2014 strength in numbers.',
            type: 'action',
            cost: 0,
            impact: { agency: 2 },
            nextId: 'u2'
          }
        ],
        walletEvent: {
          prompt: "One more month of arrears, plus the cost of backup power for a medical device.",
          options: [
            { id: 'battery', label: 'Buy a backup battery / UPS first', costLabel: '-$200', cost: 200, impact: { warmth: 1, reliability: 1, affordability: -1 } },
            { id: 'arrears', label: 'Pay down arrears first and hope outages don\u2019t hit', costLabel: '-$300', cost: 300, impact: { affordability: 1, reliability: -1 } },
            { id: 'stay-friend', label: 'Arrange nights with a friend when storms are forecast', costLabel: '$0', cost: 0, impact: { reliability: 1, agency: -1 } }
          ]
        }
      },
      {
        id: 'u2',
        day: 'Late Winter \u2014 Two Weeks Later',
        sender: 'Vihaan',
        content: `<p>Hey there,</p>
        <p>Whassup? Forgive me if my letters are more irregular over the next few weeks. I am in a bit of a bind. I\u2019ve been slowly falling behind on the bills since my mom fell sick. I\u2019ve been trying to make all the minimum payments, but it\u2019s becoming increasingly difficult. The power outages mean spoiled medication and food, which I then need to repurchase. The storm didn\u2019t just take the power\u2014 it took any safety net I had left.</p>
        <p>The utility emails are becoming more frequent since I\u2019m way past due now. If the power outages weren\u2019t enough, now they\u2019re starting to warn me that there will be a service interruption if I do not pay by a specific date. And if my mom\u2019s medication gets spoiled or her device dies because I wasn\u2019t able to pay the bill, I\u2019ll feel just awful.</p>
        <p>I imagine it so much it almost feels like a memory now: the lights go out again, and I go into the hallway to check if the emergency lights are on. But instead of that dull amber, it\u2019s still lit in that same bright white incandescent hue. The elevator indicator is still on. And I realize the truth: it\u2019s not just the storm this time, it\u2019s all my fault. All because I couldn\u2019t figure it out.</p>
        <p>Sorry if I\u2019m talking a lot about money. I\u2019m not trying to ask for anything, and I don\u2019t want to sound whiny. It\u2019s just\u2026 When power and energy mean survival, then it is impossible to separate the weather from money.</p>
        <p><em>I can call the utility company, but I\u2019m not sure what pathways there are. Is there any actual emergency help for people in my situation? Or is it just a never-ending series of forms and hold music and shame? What else can I do?</em></p>
        <p>Best,<br/>Vihaan</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Call the utility and ask about emergency assistance or payment plans.',
            type: 'action',
            cost: 0,
            impact: { affordability: 1, agency: 1 },
            nextId: 'u3'
          },
          {
            id: 'c2',
            text: 'Buy a cooler and ice to protect medication during outages.',
            type: 'action',
            cost: 0,
            impact: { reliability: 1, affordability: -1 },
            nextId: 'u3'
          },
          {
            id: 'c3',
            text: 'Coordinate with a neighbor who has backup power.',
            type: 'action',
            cost: 0,
            impact: { agency: 1 },
            nextId: 'u3'
          }
        ],
        walletEvent: {
          prompt: "Elevator outages make stairs risky; mobility and time are limited.",
          options: [
            { id: 'go-bag', label: 'Build a go-bag and set aside transit/rideshare money', costLabel: '-$80', cost: 80, impact: { reliability: 1, affordability: -1 } },
            { id: 'escalate', label: 'Escalate repairs formally \u2014 documentation, calls, time off', costLabel: '-$50', cost: 50, impact: { agency: 1, affordability: -1 } },
            { id: 'conserve', label: 'Do nothing and conserve money', costLabel: '$0', cost: 0, impact: { affordability: 1, reliability: -1 } }
          ]
        }
      },
      {
        id: 'u3',
        day: 'Late Winter \u2014 A Month Later',
        sender: 'Vihaan',
        content: `<p>Hey there,</p>
        <p>If we get the chance, I\u2019d love to meet someday. Catch up in person. While everything becomes so hectic, it would be nice to meet someone so constant. I\u2019m glad you are my friend. Thank you for being there for me. I\u2019ll be there for you, too.</p>
        <p>I\u2019ve decided to try and prepare as much as possible. So I spent last night writing everything that I knew about our situation down\u2014 how long the battery on my mom\u2019s medical device will last and charging it earlier than usual, the most urgent payments that need to be made, backup plans to preserve our medication and food\u2026 who to call first if something goes wrong. I don\u2019t want to worry my parents, so I\u2019ve started packing things slowly. I don\u2019t think I\u2019m being dramatic; I think I\u2019ve just started to accept my new reality.</p>
        <p>Maybe things will get better. Maybe things won\u2019t. I don\u2019t want an emergency to become my routine; I don\u2019t want to plan my life around instability. Mostly, I don\u2019t think I should have to live like this, but I know I\u2019m not the only one. I want to push for change, but for now I have enough on my plate. All I can do is take things one step at a time. I sincerely hope you never have to experience this kind of stress. For now, I\u2019m preparing myself as much as possible for what is yet to come.</p>
        <p><em>Still, what do I do if this becomes normal?</em></p>
        <p>Best,<br/>Vihaan</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Tell your mom and plan together \u2014 she deserves to know.',
            type: 'tone',
            cost: 0,
            impact: { agency: 1 },
            nextId: undefined
          },
          {
            id: 'c2',
            text: 'Join a tenant or community group \u2014 push for systemic change.',
            type: 'action',
            cost: 0,
            impact: { agency: 2 },
            nextId: undefined
          },
          {
            id: 'c3',
            text: 'Focus on household resilience \u2014 take care of what you can control.',
            type: 'action',
            cost: 0,
            impact: { reliability: 1, warmth: 1 },
            nextId: undefined
          }
        ]
      }
    ]
  },

  medical: {
    id: 'medical',
    name: 'Suburban',
    coordinates: { top: '92.3%', left: '75.3%' },
    themeColor: 'var(--color-chart-4)',
    budget: 600,
    contextCards: [
      { title: 'Outages as medical emergencies', text: 'Power outages can be dangerous for households that rely on electrically powered medical devices or temperature control.', source: 'Government of Canada', sourceUrl: 'https://www.canada.ca/en/services/policing/emergencies/preparedness/get-prepared/hazards-emergencies/power-outages/how-prepare.html' },
      { title: 'Backup power planning', text: 'Utilities recommend backup power plans for customers who depend on life-support equipment.', source: 'Hydro One', sourceUrl: 'https://www.hydroone.com/power-outages-and-safety/life-support-notification' },
      { title: 'Emergency preparedness kits', text: 'Emergency guidance recommends planning for at least 72 hours without power, including lighting, communication, and medical needs.', source: 'Canadian Red Cross', sourceUrl: 'https://www.redcross.ca/how-we-help/emergencies-and-disasters-in-canada/types-of-emergencies/power-outages' },
    ],
    takeaways: [
      { text: 'Parents like Levi carry the weight of energy poverty silently — the shame of not being able to provide basic comfort is real.' },
      { text: 'Energy poverty is not just a winter problem. Summer heat waves can be equally dangerous, especially for children and the elderly.' },
      { text: 'Understanding energy poverty as a systemic issue rather than a personal failure is the first step toward meaningful change.' },
    ],
    letters: [
      {
        id: 'm1',
        day: 'Summer Heat Wave \u2014 Halifax, Nova Scotia',
        sender: 'Levi',
        content: `<p>Hey buddy,</p>
        <p>You know when the summer heat is so thick that the air feels heavy and oppressive, like it\u2019s pushing down on you with all its might? Yeah, that\u2019s what it feels like right now in Halifax. We don\u2019t have AC and we live in a basement unit, so the fans have been running all night. It sounds like a wind tunnel in here! But the heat is oppressive, and instead of bringing in any cool air, it\u2019s just pushing all the still, hot air around.</p>
        <p>Somehow the bill went up again\u2014 higher than in winter, if you believe that! My boy hasn\u2019t been sleeping well. The fans are too loud and not very effective, so he wakes up all tired and cranky. His teacher called yesterday and told me that he\u2019s been falling asleep in class. \u201CIs everything okay at home?\u201D I felt so embarrassed and guilty.</p>
        <p>I tried to explain, but I\u2019m not sure they bought it. There\u2019s a lot of pressure now, but it\u2019s not Carter or the teacher\u2019s fault. It feels like my fault. I want to be a responsible parent, and I don\u2019t want Carter\u2019s teachers to think I\u2019m neglecting him at home. I bought a few more fans and some earplugs, so hopefully that will be enough to give him some peace at night. All the extra fans are running the energy bill up, but if turning them off means my kid can\u2019t sleep\u2026 I\u2019m not sure what\u2019s the best thing to do.</p>
        <p><em>What do you think is the most responsible thing to do in this situation?</em></p>
        <p>Regards,<br/>Levi</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Keep the fans running all night \u2014 Carter\u2019s sleep is the priority.',
            type: 'action',
            cost: 0,
            impact: { warmth: 2, affordability: -1 },
            nextId: 'm2'
          },
          {
            id: 'c2',
            text: 'Cool the room down, then reduce usage \u2014 balance comfort and cost.',
            type: 'action',
            cost: 0,
            impact: { affordability: 1, warmth: -1 },
            nextId: 'm2'
          },
          {
            id: 'c3',
            text: 'Spend evenings at a cooling centre or mall \u2014 come home to sleep.',
            type: 'action',
            cost: 0,
            impact: { reliability: 1, agency: -1 },
            nextId: 'm2'
          }
        ],
        walletEvent: {
          prompt: "Heat wave week; bill is already high; budget is tight.",
          options: [
            { id: 'fans-on', label: 'Keep fans running overnight so Carter sleeps', costLabel: '-$40', cost: 40, impact: { warmth: 1, affordability: -1 } },
            { id: 'fans-low', label: 'Turn fans down and use low-cost cooling tricks', costLabel: '$0', cost: 0, impact: { affordability: 1, warmth: -1 } },
            { id: 'cooling-centre', label: 'Spend evenings at a cooling centre and come home to sleep', costLabel: '-$20', cost: 20, impact: { reliability: 1, agency: -1 } }
          ]
        }
      },
      {
        id: 'm2',
        day: 'Summer Heat Wave \u2014 Days Later',
        sender: 'Levi',
        content: `<p>Hey buddy,</p>
        <p>Hope you\u2019re staying cool, because we\u2019re definitely struggling. I know, it\u2019s crazy\u2014 as if things couldn\u2019t get worse! The power cut out mid-afternoon, and all the fans stopped. I went to the mall to cool down until the power is back, and decided that now might be a good time to send you a letter.</p>
        <p>I\u2019m not sure if you know how 30-degree temperature feels when you\u2019re stuck in a basement level apartment\u2026 so let me paint a picture: the air goes still, the fridge goes quiet, and the heat starts to rise fast. It then starts to become a countdown to suffering while you scramble to save some of your food as the warmth starts to settle. Most of it is probably a goner. I sent Carter to stay with a friend for the time being, and had to do damage control. The weekly budget is blown because I need more groceries, and I\u2019m not sure how I\u2019ll be able to pay for his soccer league next week.</p>
        <p>It\u2019s hard not to feel like a bad parent, even if I can\u2019t do anything more to fix this situation. I\u2019m trying to brainstorm ways I can minimize the stress if this happens again, but it\u2019s hard to balance what\u2019s ideal with what I can actually afford. I searched on my phone to see what the government recommended, but I\u2019m sure that I will need to make some trade-offs.</p>
        <p><em>If you were in my position and you wanted to be ready for an outage happening again but money is tight, what would you put in your emergency kit?</em></p>
        <p>Regards,<br/>Levi</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Go to a mall or cooling centre \u2014 get Carter somewhere safe.',
            type: 'action',
            cost: 0,
            impact: { warmth: 2 },
            nextId: 'm3'
          },
          {
            id: 'c2',
            text: 'Get a cooler and ice plan for the food \u2014 save what you can.',
            type: 'action',
            cost: 0,
            impact: { reliability: 1, affordability: -1 },
            nextId: 'm3'
          },
          {
            id: 'c3',
            text: 'Cook what you can now before it goes bad.',
            type: 'action',
            cost: 0,
            impact: { affordability: 1 },
            nextId: 'm3'
          }
        ],
        walletEvent: {
          prompt: "Another outage could hit; you have about $40 to prepare.",
          options: [
            { id: 'cooler', label: 'Ice packs and a small cooler for food', costLabel: '-$30', cost: 30, impact: { reliability: 1, affordability: -1 } },
            { id: 'power-bank', label: 'Power bank and flashlight', costLabel: '-$25', cost: 25, impact: { agency: 1, affordability: -1 } },
            { id: 'water-food', label: 'Extra water and shelf-stable food', costLabel: '$0', cost: 0, impact: { warmth: 1, reliability: -1 } }
          ]
        }
      },
      {
        id: 'm3',
        day: 'Summer \u2014 Weeks Later',
        sender: 'Levi',
        content: `<p>Hey buddy,</p>
        <p>Thanks for your words of encouragement! Things have been slowly getting better, but the panic hasn\u2019t left my mind. I couldn\u2019t stop blaming myself for what happened with Carter, so a friend suggested I look deeper into the topic. Thanks to her, I have delved deep into the topic of energy poverty. You wouldn\u2019t believe what I learned!</p>
        <p>Hear me out: if you\u2019re ever experiencing energy hardship, it might feel like your difficulties are all a result of your own bad choices. But that is simply not true: it\u2019s more of a systemic problem than a personal problem. Energy poverty can be defined as \u201Cspending 10% or more of after-tax income on home energy bills\u201D, and hundreds of thousands of households meet that threshold. A lot of people are one energy emergency away from falling behind on their bills. That\u2019s one heat wave or one bad storm away from disaster. I\u2019m not the only one going through this, and neither would you be if you have to face something similar.</p>
        <p>Of course, it is never a bad idea to be prepared. But I\u2019m surprised that I was never taught this in school\u2014 were you? I want to share my story and talk to more of my friends and my kid\u2019s teachers about this, but\u2026 I am afraid they might look at me differently. What if they think I am using this knowledge as an excuse for neglect? Maybe they\u2019ll just dismiss me as being defensive. That being said, I finally have the words to describe my experience. I think it\u2019s still important to try\u2014 and that\u2019s why I\u2019m sharing all of this with you!</p>
        <p><em>How would you talk about this without making it sound like you\u2019re making excuses?</em></p>
        <p>Regards,<br/>Levi</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Talk to Carter\u2019s teacher first \u2014 they should understand what\u2019s happening.',
            type: 'action',
            cost: 0,
            impact: { agency: 1 },
            nextId: undefined
          },
          {
            id: 'c2',
            text: 'Lead with the facts \u2014 let the numbers speak for themselves.',
            type: 'tone',
            cost: 0,
            impact: { agency: 1 },
            nextId: undefined
          },
          {
            id: 'c3',
            text: 'Seek assistance pathways \u2014 there might be programs that can help.',
            type: 'action',
            cost: 0,
            impact: { affordability: 1, agency: 1 },
            nextId: undefined
          }
        ]
      }
    ]
  }
};

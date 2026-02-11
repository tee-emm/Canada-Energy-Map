export type RegionId = 'north' | 'city' | 'rural' | 'medical';

export interface Choice {
  id: string;
  text: string;
  type: 'tone' | 'action' | 'wallet';
  impact: {
    warmth?: number;
    reliability?: number;
    affordability?: number;
    agency?: number;
  };
  nextId?: string; // ID of the next letter/beat
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
      impact: {
        warmth?: number;
        reliability?: number;
        affordability?: number;
        agency?: number;
      };
    }[];
  };
}

export interface Region {
  id: RegionId;
  name: string;
  coordinates: { top: string; left: string };
  letters: Letter[];
  themeColor: string;
}

export const STORIES: Record<RegionId, Region> = {
  north: {
    id: 'north',
    name: 'The North',
    coordinates: { top: '25%', left: '35%' },
    themeColor: 'var(--color-primary)',
    letters: [
      // BEAT 1: INTRO
      {
        id: 'n1',
        day: 'November 4 - 4:00 PM (Sunset)',
        sender: 'Jamie (17)',
        content: `<p>Hey,</p>
        <p>Thanks for asking. Yeah, the power flickered three times just while writing this. It’s not even -20 yet.</p>
        <p>Mom’s stressing about the diesel shipment. If the ice road isn’t solid by next week, prices double at the store. I wanted to download that course material you sent, but the satellite internet is acting up again—bandwidth is throttled until the 1st.</p>
        <p>Do you guys down south actually get 24/7 power? Sounds fake.</p>`,
        choices: [
          {
            id: 'c1',
            text: 'That sounds incredibly frustrating. I’m sorry.',
            type: 'tone',
            impact: { agency: 1 },
            nextId: 'n2'
          },
          {
            id: 'c2',
            text: 'Have you tried downloading it at school instead?',
            type: 'tone',
            impact: { agency: -1 },
            nextId: 'n2'
          }
        ],
        walletEvent: {
          prompt: "The grocery bill is $40 higher than expected due to transport costs.",
          options: [
            { id: 'w1', label: 'Buy full groceries', costLabel: '-$40 (Skip phone bill)', impact: { warmth: 1, agency: -1 } },
            { id: 'w2', label: 'Buy less food', costLabel: 'Save data money', impact: { warmth: -1, agency: 1 } }
          ]
        }
      },
      // BEAT 2: THE ANNOUNCEMENT
      {
        id: 'n2',
        day: 'November 12 - Pitch Black',
        sender: 'Jamie (17)',
        content: `<p>We just got the notice. Rotating outages start tomorrow. They say it’s "scheduled maintenance" on the diesel plant, but everyone knows they’re rationing fuel until the truck arrives.</p>
        <p>It means 4 hours on, 4 hours off. My gaming PC is basically a paperweight now. But worse, Mom’s CPAP machine needs power at night. She’s pretending it’s fine, but I hear her struggling to breathe when the hum stops.</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Is there a community center with backup power?',
            type: 'action',
            impact: { reliability: 1, warmth: 1 },
            nextId: 'n3'
          },
          {
            id: 'c2',
            text: 'Can you charge a battery pack during the "on" hours?',
            type: 'action',
            impact: { reliability: 1, agency: 1 },
            nextId: 'n3'
          }
        ],
        walletEvent: {
          prompt: "You found a used UPS battery backup online.",
          options: [
            { id: 'buy-ups', label: 'Buy UPS Battery', costLabel: '$200 (Use Winter Coat Fund)', impact: { reliability: 2, warmth: -1 } },
            { id: 'risk-it', label: 'Risk the outages', costLabel: 'Save money', impact: { reliability: -2, affordability: 1 } }
          ]
        }
      },
      // BEAT 3: DEEP FREEZE
      {
        id: 'n3',
        day: 'December 2 - -35°C',
        sender: 'Jamie (17)',
        content: `<p>It’s cold. Like, inside-your-bones cold. The outages are getting longer. We huddle in the living room under three blankets when the heat cuts out.</p>
        <p>I tried to do my homework by candlelight, but the ink in my pen actually froze. I’m not joking. I might fail history just because I can’t physically write the essay.</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Can you talk to your teacher about an extension?',
            type: 'tone',
            impact: { agency: 1 },
            nextId: 'n4'
          },
          {
            id: 'c2',
            text: 'Focus on staying warm, school can wait.',
            type: 'tone',
            impact: { warmth: 1, agency: -1 },
            nextId: 'n4'
          }
        ]
      },
      // BEAT 4: THE CRISIS
      {
        id: 'n4',
        day: 'December 20 - The Storm',
        sender: 'Jamie (17)',
        content: `<p>Blizzard warning. Power is out completely now. No rotation. Just gone.</p>
        <p>We have a small propane heater, but we’re running low on canisters. The house is dropping to 10 degrees. Mom is looking at the food in the freezer—if it thaws, we lose a month’s worth of meat.</p>
        <p>We have to make a choice. Heat the main room, or keep the freezer cold by putting it outside (which risks bears/animals)?</p>`,
        choices: [
          {
            id: 'c1',
            text: 'Prioritize heat. You can’t eat frozen meat if you freeze to death.',
            type: 'action',
            impact: { warmth: 2, affordability: -2 }, // Lose food
            nextId: 'n5'
          },
          {
            id: 'c2',
            text: 'Protect the food supply. Bundle up tighter.',
            type: 'action',
            impact: { warmth: -2, affordability: 2 },
            nextId: 'n5'
          }
        ],
        walletEvent: {
          prompt: "Emergency Supply Run",
          options: [
            { id: 'fuel', label: 'Buy last propane canisters', costLabel: '$100 (Price gouged)', impact: { warmth: 2, affordability: -2 } },
            { id: 'nothing', label: 'Hunker down', costLabel: '$0', impact: { warmth: -2, affordability: 0 } }
          ]
        }
      },
      // BEAT 5: RESOLUTION
      {
        id: 'n5',
        day: 'January 5 - Sunrise (Briefly)',
        sender: 'Jamie (17)',
        content: `<p>The power came back yesterday. The hum of the fridge was the most beautiful sound I’ve ever heard.</p>
        <p>We made it. Mom’s okay. I’m behind in school, but I’m alive. The diesel truck finally crossed the ice road this morning. I watched it from the window like it was Santa’s sleigh.</p>
        <p>I guess this is just life here. But I wonder... does it have to be this hard?</p>`,
        choices: [
          {
            id: 'end',
            text: 'You’re incredibly resilient, Jamie.',
            type: 'tone',
            impact: { agency: 1 },
            nextId: undefined
          }
        ]
      }
    ]
  },
  city: {
    id: 'city',
    name: 'Big City',
    coordinates: { top: '75%', left: '68%' },
    themeColor: 'var(--color-accent)',
    letters: [
      {
        id: 'c1',
        day: 'December 2nd',
        sender: 'Elena',
        content: `<p>Hi neighbor,</p>
        <p>Did you feel that draft in the hallway? My apartment is freezing even with the rads fully open. The landlord says the boiler is "working as intended" but I’m wearing a parka to watch TV.</p>
        <p>I got the hydro bill today. It’s... a lot. They added a "delivery charge" that’s higher than my actual usage. I don’t know if I can pay rent AND this bill this month.</p>`,
        choices: [
          {
            id: 'ch1',
            text: 'We should organize a tenant meeting about the heat.',
            type: 'action',
            impact: { agency: 2, warmth: 0 },
            nextId: 'c2'
          },
          {
            id: 'ch2',
            text: 'Maybe get a space heater? I can lend you one.',
            type: 'action',
            impact: { warmth: 1, affordability: -1 },
            nextId: 'c2'
          }
        ],
        walletEvent: {
          prompt: "Rent is due ($1200) and Hydro is ($150). You have $1300.",
          options: [
            { id: 'pay-both', label: 'Pay both', costLabel: 'Overdraft (-$50)', impact: { affordability: -2, reliability: 1 } },
            { id: 'pay-rent', label: 'Pay rent only', costLabel: 'Risk disconnection', impact: { affordability: 1, reliability: -2 } }
          ]
        }
      },
      {
        id: 'c2',
        day: 'December 15th',
        sender: 'Elena',
        content: `<p>I saw you talking to the super. Any luck? He just told me to "put on a sweater."</p>
        <p>I bought plastic film for the windows, the shrink-wrap kind. It helps a bit, but the walls themselves feel like ice. I can see my breath in the bedroom. I’m thinking of sleeping in the living room, but my roommates are noisy.</p>`,
        choices: [
          {
            id: 'ch1',
            text: 'We need to document the temperature. Take photos of a thermometer.',
            type: 'action',
            impact: { agency: 2 },
            nextId: 'c3'
          },
          {
            id: 'ch2',
            text: 'Just use the space heater, it’s not worth the fight.',
            type: 'action',
            impact: { warmth: 1, agency: -1 },
            nextId: 'c3'
          }
        ]
      },
      {
        id: 'c3',
        day: 'January 4th',
        sender: 'Elena',
        content: `<p>Happy New Year... I guess. I woke up sick. Sore throat, congestion. It’s definitely the dampness in here. There’s mold growing in the corner of the ceiling now.</p>
        <p>I called the city bylaw officer. They said they’d send someone "within 2-3 weeks." Meanwhile, the landlord sent a notice about a "Above Guideline Rent Increase" to pay for "efficiency upgrades" (aka fixing the boiler he neglected).</p>`,
        choices: [
          {
            id: 'ch1',
            text: 'That’s illegal. We fight this at the board.',
            type: 'tone',
            impact: { agency: 2, affordability: 0 },
            nextId: 'c4'
          },
          {
            id: 'ch2',
            text: 'Maybe it’s time to look for a new place?',
            type: 'tone',
            impact: { agency: -1, reliability: -1 },
            nextId: 'c4'
          }
        ],
        walletEvent: {
          prompt: "Medical costs vs Heating costs",
          options: [
            { id: 'meds', label: 'Buy cough syrup & meds', costLabel: '$40', impact: { warmth: 0, agency: 1 } },
            { id: 'heat', label: 'Run heater 24/7', costLabel: '$40 electricity', impact: { warmth: 2, agency: -1 } }
          ]
        }
      },
      {
        id: 'c4',
        day: 'January 20th - The Breakdown',
        sender: 'Elena',
        content: `<p>The boiler died completely. The whole building is without heat. It’s -15 outside.</p>
        <p>The landlord dropped off these cheap electric fan heaters, one per unit. He says it’s a "temporary solution." But I checked my meter—it’s spinning like a top. He’s shifting the heating cost to our personal hydro bills!</p>`,
        choices: [
          {
            id: 'ch1',
            text: 'Refuse to pay the hydro. Keep the bill as evidence.',
            type: 'action',
            impact: { agency: 2, affordability: 1, reliability: -1 },
            nextId: 'c5'
          },
          {
            id: 'ch2',
            text: 'Use the heater. We have no choice.',
            type: 'action',
            impact: { warmth: 2, affordability: -2 },
            nextId: 'c5'
          }
        ]
      },
      {
        id: 'c5',
        day: 'February 1st',
        sender: 'Elena',
        content: `<p>The city inspector finally came. They issued a work order. The boiler is being fixed today.</p>
        <p>I’m exhausted. Fighting for basic heat feels like a full-time job. My bank account is drained from the extra electricity costs, and I still have that cough.</p>
        <p>But... we did it. The other tenants are talking to each other now. We formed a group chat. It’s something.</p>`,
        choices: [
          {
            id: 'end',
            text: 'Community is the best insulation.',
            type: 'tone',
            impact: { agency: 1 },
            nextId: undefined
          }
        ]
      }
    ]
  },
  rural: {
    id: 'rural',
    name: 'Rural',
    coordinates: { top: '65%', left: '20%' }, // Prairies/West
    themeColor: 'var(--color-chart-3)',
    letters: [
      {
        id: 'r1',
        day: 'January 15',
        sender: 'Walter',
        content: `<p>Dear friend,</p>
        <p>The propane tank is at 15%. I checked it this morning. The truck won’t come out unless I order a full fill, but my pension check doesn’t clear until next Friday.</p>
        <p>I’ve closed off the back rooms and I’m sleeping in the kitchen near the woodstove. It’s fine, really. I’ve lived through colder winters. Just don’t tell my daughter, she worries too much.</p>`,
        choices: [
          {
            id: 'rc1',
            text: 'I won’t tell her, but please let me help with the fill.',
            type: 'tone',
            impact: { agency: -1, warmth: 2 },
            nextId: 'r2'
          },
          {
            id: 'rc2',
            text: 'You shouldn’t have to live in one room, Walter.',
            type: 'tone',
            impact: { agency: 1, warmth: 0 },
            nextId: 'r2'
          }
        ],
        walletEvent: {
          prompt: "Propane minimum delivery is $800.",
          options: [
            { id: 'fill', label: 'Order fill on credit', costLabel: 'High interest', impact: { warmth: 2, affordability: -2 } },
            { id: 'wood', label: 'Buy firewood cord', costLabel: '$300 cash', impact: { warmth: 1, affordability: -1 } }
          ]
        }
      },
      {
        id: 'r2',
        day: 'January 22',
        sender: 'Walter',
        content: `<p>The wood pile is wet. I must have tarped it poorly last autumn. It smokes something fierce when I try to light it.</p>
        <p>I’ve been wearing my boots inside. The floor is so cold it aches my joints. I found an old electric blanket in the attic, but I’m scared to plug it in—the wiring in this house is from the 60s.</p>`,
        choices: [
          {
            id: 'rc1',
            text: 'Don’t risk the wiring. Fire is a real danger.',
            type: 'action',
            impact: { reliability: 1, warmth: -1 },
            nextId: 'r3'
          },
          {
            id: 'rc2',
            text: 'Try it on low setting? You need the heat.',
            type: 'action',
            impact: { warmth: 1, reliability: -1 },
            nextId: 'r3'
          }
        ]
      },
      {
        id: 'r3',
        day: 'February 2',
        sender: 'Walter',
        content: `<p>My daughter called. She heard my voice rasping and guessed I was sick. She wants me to come stay with her in the city.</p>
        <p>I don’t want to go. This is my home. If I leave, the pipes might burst and ruin everything I’ve built. But I’m down to one meal a day to save money for the next bill.</p>`,
        choices: [
          {
            id: 'rc1',
            text: 'Go to the city, Walter. It’s just for a few weeks.',
            type: 'tone',
            impact: { warmth: 2, agency: -2 },
            nextId: 'r4'
          },
          {
            id: 'rc2',
            text: 'Is there a neighbor who can check on the house if you stay?',
            type: 'tone',
            impact: { agency: 1, warmth: 0 },
            nextId: 'r4'
          }
        ],
        walletEvent: {
          prompt: "Pipe protection vs Food",
          options: [
            { id: 'heat-tape', label: 'Buy heat tape for pipes', costLabel: '$60', impact: { reliability: 2, affordability: -1 } },
            { id: 'food', label: 'Buy hearty groceries', costLabel: '$60', impact: { warmth: 1, reliability: -1 } }
          ]
        }
      },
      {
        id: 'r4',
        day: 'February 14',
        sender: 'Walter',
        content: `<p>The truck finally came. I had to sell my old shotgun to pay the driver cash on arrival. He wouldn't take a check.</p>
        <p>The tank is full. The furnace is running. I’m sitting in my armchair without a coat for the first time in weeks. It feels like luxury. It feels like I survived a war.</p>`,
        choices: [
          {
            id: 'end',
            text: 'Enjoy the warmth, my friend.',
            type: 'tone',
            impact: { warmth: 1 },
            nextId: undefined
          }
        ]
      }
    ]
  },
  medical: {
    id: 'medical',
    name: 'Atlantic',
    coordinates: { top: '70%', left: '85%' },
    themeColor: 'var(--color-chart-4)',
    letters: [
      {
        id: 'm1',
        day: 'February 10',
        sender: 'Sarah',
        content: `<p>The storm warning is red for tonight. </p>
        <p>My son’s ventilator has a 4-hour battery backup. If the lines go down like they did last year, we’re in trouble. I’ve got the coolers ready for his meds, but I can’t afford a generator.</p>
        <p>I’m packing the car just in case we need to drive to the hospital, but the roads might be closed. It feels like gambling with his life every time the wind picks up.</p>`,
        choices: [
          {
            id: 'mc1',
            text: 'Do you have a priority status with the utility company?',
            type: 'action',
            impact: { reliability: 1 },
            nextId: 'm2'
          },
          {
            id: 'mc2',
            text: 'Is there a neighbor with a generator?',
            type: 'action',
            impact: { agency: 1 },
            nextId: 'm2'
          }
        ],
        walletEvent: {
          prompt: "Storm prep choices.",
          options: [
            { id: 'gen', label: 'Buy portable power station', costLabel: '$400 (Credit Card)', impact: { reliability: 2, affordability: -2 } },
            { id: 'gas', label: 'Fill car gas tank', costLabel: '$80', impact: { reliability: 1, affordability: 0 } }
          ]
        }
      },
      {
        id: 'm2',
        day: 'February 10 - 11:00 PM',
        sender: 'Sarah',
        content: `<p>Lights flickered. Then died. It’s pitch black.</p>
        <p>The vent switched to battery mode immediately. Beep... beep... beep. It’s a countdown. We have 4 hours. The wind is howling so loud I can’t hear the radio.</p>
        <p>Do we stay and hope the power comes back, or risk the icy roads to get to the ER now?</p>`,
        choices: [
          {
            id: 'mc1',
            text: 'Don’t risk the roads yet. Wait 2 hours.',
            type: 'action',
            impact: { reliability: -1, agency: 1 },
            nextId: 'm3'
          },
          {
            id: 'mc2',
            text: 'Go. Now. Before the snow gets deeper.',
            type: 'action',
            impact: { reliability: 2, warmth: -1 }, // Cold car
            nextId: 'm3'
          }
        ]
      },
      {
        id: 'm3',
        day: 'February 11 - 2:00 AM',
        sender: 'Sarah',
        content: `<p>We stayed. The battery is at 40%. The house is getting cold fast. I wrapped him in the thermal blankets.</p>
        <p>I called the utility emergency line. "High call volume, please wait." I’ve been on hold for 45 minutes watching the battery percentage drop. 39%... 38%...</p>`,
        choices: [
          {
            id: 'mc1',
            text: 'Hang up and call 911/Emergency Services.',
            type: 'action',
            impact: { reliability: 2, agency: -1 },
            nextId: 'm4'
          },
          {
            id: 'mc2',
            text: 'Prepare the car. It’s time to move.',
            type: 'action',
            impact: { agency: 1, reliability: 1 },
            nextId: 'm4'
          }
        ],
        walletEvent: {
          prompt: "Last resort: Taxi to hospital?",
          options: [
            { id: 'taxi', label: 'Call specialized transport', costLabel: '$200', impact: { reliability: 2, affordability: -1 } },
            { id: 'drive', label: 'Drive yourself', costLabel: 'High Risk', impact: { reliability: -1, affordability: 1 } }
          ]
        }
      },
      {
        id: 'm4',
        day: 'February 11 - 6:00 AM',
        sender: 'Sarah',
        content: `<p>We’re at the hospital. The lobby is full of people charging phones, but we got a room because of the equipment.</p>
        <p>He’s plugged in. He’s safe. I’m shivering in the plastic chair, drinking terrible coffee. My house might have frozen pipes by the time we get back, but my son is breathing.</p>
        <p>I can’t do this every winter. I just can’t.</p>`,
        choices: [
          {
            id: 'end',
            text: 'You made the right call. He’s safe.',
            type: 'tone',
            impact: { agency: 1 },
            nextId: undefined
          }
        ]
      }
    ]
  }
};

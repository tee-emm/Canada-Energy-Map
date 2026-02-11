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
  nextId?: string;
  requiredFlag?: string;
}

export interface Letter {
  id: string;
  day: string; // "Early Winter", "Deep Winter"
  sender: string;
  content: string; // HTML supported for emphasis
  choices: Choice[];
  walletEvent?: {
    prompt: string;
    options: {
      id: string;
      label: string;
      costLabel: string; // "$50" or "2 days of heat"
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
      {
        id: 'n1',
        day: 'Early November',
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
            nextId: 'n1-followup'
          },
          {
            id: 'c2',
            text: 'Have you tried downloading it at school instead?',
            type: 'tone',
            impact: { agency: -1 }, // A bit dismissive
            nextId: 'n1-followup'
          }
        ],
        walletEvent: {
          prompt: "The grocery bill is $40 higher than expected due to transport costs.",
          options: [
            { id: 'w1', label: 'Buy full groceries', costLabel: '-$40 (Skip phone bill)', impact: { warmth: 1, agency: -1 } },
            { id: 'w2', label: 'Buy less food', costLabel: 'Save data money', impact: { warmth: -1, agency: 1 } }
          ]
        }
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
            nextId: 'c1-b'
          },
          {
            id: 'ch2',
            text: 'Maybe get a space heater? I can lend you one.',
            type: 'action',
            impact: { warmth: 1, affordability: -1 }, // Electricity cost goes up
            nextId: 'c1-b'
          }
        ],
        walletEvent: {
          prompt: "Rent is due and the hydro bill is $150.",
          options: [
            { id: 'pay-both', label: 'Pay both', costLabel: 'Empty savings', impact: { affordability: -2, reliability: 1 } },
            { id: 'pay-rent', label: 'Pay rent only', costLabel: 'Risk disconnection', impact: { affordability: 1, reliability: -2 } }
          ]
        }
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
            nextId: 'r1-b'
          },
          {
            id: 'rc2',
            text: 'You shouldn’t have to live in one room, Walter.',
            type: 'tone',
            impact: { agency: 1, warmth: 0 },
            nextId: 'r1-b'
          }
        ],
        walletEvent: {
          prompt: "Propane minimum delivery is $800.",
          options: [
            { id: 'fill', label: 'Order fill on credit', costLabel: 'High interest', impact: { warmth: 2, affordability: -2 } },
            { id: 'wood', label: 'Buy firewood cord', costLabel: '$300 cash', impact: { warmth: 1, affordability: -1 } }
          ]
        }
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
            nextId: 'm1-b'
          },
          {
            id: 'mc2',
            text: 'Is there a neighbor with a generator?',
            type: 'action',
            impact: { agency: 1 },
            nextId: 'm1-b'
          }
        ],
        walletEvent: {
          prompt: "Storm prep choices.",
          options: [
            { id: 'gen', label: 'Buy portable power station', costLabel: '$400 (Credit Card)', impact: { reliability: 2, affordability: -2 } },
            { id: 'gas', label: 'Fill car gas tank', costLabel: '$80', impact: { reliability: 1, affordability: 0 } }
          ]
        }
      }
    ]
  }
};

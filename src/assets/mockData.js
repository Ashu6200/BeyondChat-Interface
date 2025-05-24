import {
  Workflow,
  ClipboardCheck,
  MoveUpRight,
  User,
  MessageCircle,
  Building,
  BookOpen,
  CreditCard,
  Briefcase,
} from 'lucide-react';

export const conversations = [
  {
    name: 'Luis',
    source: 'GitHub',
    initial: 'L',
    avatarBg: 'bg-purple-500',
    preview: 'Hey! I have a question about...',
    time: '45m',
    badge: null,
  },
  {
    name: 'Ivan',
    source: 'Nike',
    initial: 'I',
    avatarBg: 'bg-red-500',
    preview: 'Hi there, I have a question about my order...',
    time: '30m',
    badge: '3min',
  },
  {
    name: 'Lead from New York',
    source: '',
    initial: 'L',
    avatarBg: 'bg-blue-500',
    preview: 'Good morning, let me know when...',
    time: '45m',
    badge: null,
  },
  {
    name: 'Resolving API problems',
    source: '',
    initial: 'R',
    avatarBg: 'bg-gray-800',
    preview: 'Bug report',
    time: '49m',
    badge: null,
  },
  {
    name: 'Miracle - Exemplary Bank',
    source: '',
    initial: 'M',
    avatarBg: 'bg-green-500',
    preview: "Hey there, I'm here to...",
    time: '55m',
    badge: null,
  },
];

export const detailsContent = [
  {
    title: 'Link',
    subItems: [
      {
        icon: <Workflow className='h-4 w-4' />,
        title: 'Tracker Ticket',
      },
      {
        icon: <ClipboardCheck className='h-4 w-4' />,
        title: 'Back- Office ticket',
      },
      {
        icon: <MoveUpRight className='h-4 w-4' />,
        title: 'Side Conversation',
      },
    ],
  },
  {
    title: 'User Data',
    subItems: [
      {
        icon: <User className='h-4 w-4' />,
        title: 'Profile Info',
      },
      {
        icon: <User className='h-4 w-4' />,
        title: 'Activity Logs',
      },
    ],
  },
  {
    title: 'Conversation Attribute',
    subItems: [
      {
        icon: <MessageCircle className='h-4 w-4' />,
        title: 'Sentiment',
      },
      {
        icon: <MessageCircle className='h-4 w-4' />,
        title: 'Response Time',
      },
    ],
  },
  {
    title: 'Company Details',
    subItems: [
      {
        icon: <Building className='h-4 w-4' />,
        title: 'Company Name',
      },
      {
        icon: <Building className='h-4 w-4' />,
        title: 'Industry',
      },
    ],
  },
  {
    title: 'Salesforce',
    subItems: [
      {
        icon: <BookOpen className='h-4 w-4' />,
        title: 'Lead Record',
      },
      {
        icon: <BookOpen className='h-4 w-4' />,
        title: 'Opportunity Info',
      },
    ],
  },
  {
    title: 'Stripe',
    subItems: [
      {
        icon: <CreditCard className='h-4 w-4' />,
        title: 'Payment History',
      },
      {
        icon: <CreditCard className='h-4 w-4' />,
        title: 'Subscription Plan',
      },
    ],
  },
  {
    title: 'Jira for Ticket',
    subItems: [
      {
        icon: <Briefcase className='h-4 w-4' />,
        title: 'Open Tickets',
      },
      {
        icon: <Briefcase className='h-4 w-4' />,
        title: 'Resolved Issues',
      },
    ],
  },
  {
    title: 'Jira for Ticket',
    subItems: [
      {
        icon: <Briefcase className='h-4 w-4' />,
        title: 'Open Tickets',
      },
      {
        icon: <Briefcase className='h-4 w-4' />,
        title: 'Resolved Issues',
      },
    ],
  },
];
export const aiMockChats = [
  {
    role: 'user',
    context: [
      {
        text: '',
        composer: true,
      },
      {
        text: '',
        composer: false,
      },
      {
        text: '',
        composer: true,
      },
    ],
  },
];

export const aiDropdownMenu = [
  {
    menu: 'Rephrase',
  },
  {
    menu: 'My tone of voice',
  },
  {
    menu: 'More friendly',
  },
  {
    menu: 'More Formal',
  },
  {
    menu: 'Fix grammar & Spelling',
  },
  {
    menu: 'Translate',
  },
];

export const mockConversations = [
  {
    sender: 'customer',
    message: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [
            { type: 'text', text: 'Login Issue on My Account' },
            { type: 'hardBreak' },
            { type: 'text', text: 'Please help ASAP.' },
          ],
        },
      ],
    },
  },
  {
    sender: 'agent',
    message: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [
            {
              type: 'text',
              marks: [
                { type: 'bold' },
                { type: 'italic' },
                { type: 'underline' },
              ],
              text: 'We’re here to help!',
            },
          ],
        },
      ],
    },
  },
  {
    sender: 'customer',
    message: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'I tried resetting my password, but the link doesn’t work.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [{ type: 'bold' }],
              text: 'It just keeps redirecting to the login page.',
            },
          ],
        },
      ],
    },
  },
  {
    sender: 'agent',
    message: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'That’s not ideal!',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [{ type: 'italic' }],
              text: 'Can you try clearing your browser cache and using the link again?',
            },
          ],
        },
      ],
    },
  },
  {
    sender: 'customer',
    message: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [
            {
              type: 'text',
              marks: [
                { type: 'bold' },
                { type: 'italic' },
                { type: 'underline' },
              ],
              text: 'Okay, I’ll try that.',
            },
          ],
        },
      ],
    },
  },
  {
    sender: 'customer',
    message: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'It worked! Thanks a lot.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [{ type: 'italic' }],
              text: 'You saved my day!',
            },
          ],
        },
      ],
    },
  },
  {
    sender: 'agent',
    message: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [
            { type: 'text', text: 'Glad to hear that!' },
            { type: 'hardBreak' },
            { type: 'text', text: 'Feel free to reach out anytime.' },
          ],
        },
      ],
    },
  },
];

export const aiMockConversations = [
  {
    sender: 'agent',
    message: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'How do i get refund?',
            },
          ],
        },
      ],
    },
  },
  {
    sender: 'ai',
    message: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.`,
            },
          ],
        },
        { type: 'hardBreak' },
        { type: 'hardBreak' },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `Please note:`,
            },
          ],
        },
        { type: 'hardBreak' },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `We can only refund orders placed within the last 60 days, and your item must meet our requirement for condition to be refunded. Please check when you placed your order before proceeding.`,
            },
          ],
        },
        { type: 'hardBreak' },
        { type: 'hardBreak' },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `Once I've checked these details, if everything looks Ok, i will send a return QR code which you can use to post the item back to us. Your refund will be automatically issued once you put it in post`,
            },
          ],
        },
      ],
    },
    resources: {
      type: 'doc',
      content: {
        type: 'list',
        number: 15,
        list: [
          {
            link: '#',
            title: 'Getting a refund',
          },
          {
            link: '#',
            title: 'Refund for an order placed by mistake',
          },
          {
            link: '#',
            title: 'Refund for an unwanted gift',
          },
        ],
      },
    },
  },
];
export const customerMessage = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        {
          type: 'text',
          text: 'Issue with checkout page',
          marks: [{ type: 'bold' }, { type: 'underline' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'I keep getting an error when I try to complete the payment. The page just reloads and nothing happens.',
          marks: [],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Tried both Chrome and Firefox. Same issue.',
          marks: [{ type: 'italic' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Please help. I need to place this order today.',
          marks: [{ type: 'bold' }],
        },
      ],
    },
  ],
};

export default {
  tasks: [
    {
      id: 0,
      type: "Meeting",
      title: "Meeting with Andrew Piker",
      time: "9:00"
    },
    {
      id: 1,
      type: "Call",
      title: "Call with HT Company",
      time: "12:00"
    },
    {
      id: 2,
      type: "Meeting",
      title: "Meeting with Zoe Alison",
      time: "14:00"
    },
    {
      id: 3,
      type: "Interview",
      title: "Interview with HR",
      time: "15:00"
    }
  ],
  bigStat: [
    {
      product: "Campaign Analytics",
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: true }
      },
      color: "primary",
      registrations: {
        monthly: { value: 5, profit: false },
        weekly: { value: 4, profit: true },
        daily: { value: 3, profit: true }
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: true },
        daily: { value: 3.25, profit: true }
      }
    },
  ],
  notifications: [
    {
      id: 0,
      icon: "thumbs-up",
      color: "primary",
      content:
        'Ken <span className="fw-semi-bold">accepts</span> your invitation'
    },
    {
      id: 1,
      icon: "file",
      color: "success",
      content: "Report from LT Company"
    },
    {
      id: 2,
      icon: "envelope",
      color: "danger",
      content: '4 <span className="fw-semi-bold">Private</span> Mails'
    },
    {
      id: 3,
      icon: "comment",
      color: "success",
      content: '3 <span className="fw-semi-bold">Comments</span> to your Post'
    },
    {
      id: 4,
      icon: "cog",
      color: "light",
      content: 'New <span className="fw-semi-bold">Version</span> of RNS app'
    },
    {
      id: 5,
      icon: "bell",
      color: "info",
      content:
        '15 <span className="fw-semi-bold">Notifications</span> from Social Apps'
    }
  ],
  table: [
    {
      id: 0,
      name: "Harsh Mehta",
      email: "ottoto@wxample.com",
      product: "Help me pay off my car!",
      price: "$70",
      date: "11 May 2020",
      city: "Otsego",
      status: "Sent"
    },
    {
      id: 1,
      name: "Trip Smith",
      email: "thornton@wxample.com",
      product: "Rent assistance to avoid eviction",
      price: "$85",
      date: "4 Jun 2020",
      city: "Fivepointville",
      status: "Sent"
    },
    {
      id: 2,
      name: "John Wright Stanly",
      email: "bird@wxample.com",
      product: "Rent assistance to avoid eviction",
      price: "$165",
      date: "27 Aug 2020",
      city: "Leadville North",
      status: "Pending"
    },
    {
      id: 3,
      name: "Mihir Kachroo",
      email: "josephmay@wxample.com",
      product: "Help me pay off my car!",
      price: "$100",
      date: "19 Feb 2020",
      city: "Seaforth",
      status: "Declined"
    },
    {
      id: 4,
      name: "Will McCoy",
      email: "horadnia@wxample.com",
      product: "Rent assistance to avoid eviction",
      price: "$150",
      date: "1 Mar 2020",
      city: "Hanoverton",
      status: "Sent"
    }
  ]
};

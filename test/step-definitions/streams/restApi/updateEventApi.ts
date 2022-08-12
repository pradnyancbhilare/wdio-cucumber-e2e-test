import { Given, When, Then } from "@cucumber/cucumber";
import chai from "chai";
import reporter from "../../../utils/reporter"
import CreateEventRestApi from "../../../page-objects/streams/restApi/createEventRestApi"
import UpdateEventRestApi from "../../../page-objects/streams/restApi/updateEventRestApi"
import PeopleRestApi from "../../../page-objects/streams/restApi/peopleRestApi"
import ChannelRestApi from "../../../page-objects/streams/restApi/channelRestApi"
import HomeRestApi from "../../../page-objects/streams/restApi/homeRestApi"
import LandingPageRestApi from "../../../page-objects/streams/restApi/landingPageRestApi"
import { createEventJsonFile } from "./createEventApi";

Given (/^An event with sessions exists$/, async function(){
    //@ts-ignore
    const host = browser.config.Streams_Api_Host;

    let existingEvent = Object.getPrototypeOf(HomeRestApi).constructor.getEventDetailsByUuid;

    if(typeof existingEvent == "undefined"){

      let getEvents = Object.getPrototypeOf(HomeRestApi).constructor.getEventsForChannelRes;

      const matchingItem = getEvents.find((event: any) => {
          return event.sessions !== [];
      })
        
      console.log(JSON.parse(JSON.stringify(matchingItem)));
      chai.assert(matchingItem.sessions !== [], "Event with sessions found");

      const eventUuid = matchingItem.uuid;

      
      existingEvent = await CreateEventRestApi.getEventDetailsByUuid(host, eventUuid);
      chai.assert(existingEvent.uuid === eventUuid);
    } else {
      chai.assert(typeof existingEvent != "undefined");
    }

})

When(/^An event is updated with the passcode list$/, async function() {
    //@ts-ignore
    const host = browser.config.Streams_Api_Host;

    let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;
    const passCodeList = Object.getPrototypeOf(PeopleRestApi).constructor.addNewPasscodeListEmailAndPassRes;

    let len = Object.keys(eventDetails.sessions).length;
    //@ts-ignore
    let gatedSessions = [eventDetails.sessions[0].session];
    for(let i = 1; i < len; ++i){
      gatedSessions.push(eventDetails.sessions[i].session);
    }
    eventDetails.registration_settings.type = 2;

    eventDetails.registration_settings.requirements = {
        "3": [
            {
            "gatedSessions": 
                gatedSessions
            ,
            "type": passCodeList.type,
            "passcodeList": [
                passCodeList.passcode_list
            ]
            }
        ]
    }

    eventDetails.registration_on = true;

    eventDetails.required_registration_questions =[
      1,
      2,
      3,
      10
    ]

    eventDetails.registration_steps = [
        {
          "type": "general",
          "isOn": true,
          "questions": [
            {
              "registration_question": 1,
              "channel": 0,
              "name": "First Name",
              "type": "text",
              "options": null,
              "global": true,
              "persistent": true,
              "default_value": null,
              "placeholder": null,
              "name_translation": null,
              "options_translation": null
            },
            {
              "registration_question": 2,
              "channel": 0,
              "name": "Last Name",
              "type": "text",
              "options": null,
              "global": true,
              "persistent": true,
              "default_value": null,
              "placeholder": null,
              "name_translation": null,
              "options_translation": null
            },
            {
              "registration_question": 3,
              "channel": 0,
              "name": "Email Address",
              "type": "email",
              "options": null,
              "global": true,
              "persistent": true,
              "default_value": null,
              "placeholder": null,
              "name_translation": null,
              "options_translation": null
            },
            {
              "registration_question": 10,
              "channel": 0,
              "name": "Passcode",
              "type": "text",
              "options": null,
              "global": true,
              "persistent": false,
              "default_value": null,
              "placeholder": null,
              "name_translation": null,
              "options_translation": null
            }
          ]
        },
        {
          "type": "profile",
          "isOn": false,
          "questions": [
            {
              "registration_question": 6,
              "channel": 0,
              "name": "Company Name",
              "type": "text",
              "options": null,
              "global": true,
              "persistent": true,
              "default_value": null
            },
            {
              "registration_question": 4,
              "channel": 0,
              "name": "Bio",
              "type": "text",
              "options": null,
              "global": true,
              "persistent": false,
              "default_value": null
            },
            {
              "registration_question": 9,
              "channel": 0,
              "name": "Fun Fact",
              "type": "text",
              "options": null,
              "global": true,
              "persistent": false,
              "default_value": null
            }
          ]
        },
        {
          "type": "avatar",
          "isOn": false
        }
      ]



      eventDetails = { event: eventDetails};
      const updateEvent = await UpdateEventRestApi.updateEvent(host, eventDetails);
      chai.assert(updateEvent.status === 200, `Request Successful - ${updateEvent.status}`);

      const getEvent = await CreateEventRestApi.getEventDetailsByUuid(host, eventDetails.event.uuid);
      chai.assert(getEvent.uuid === eventDetails.event.uuid);
})

Then (/^The passcode list will be verifed as added to event$/, async function() {
    //@ts-ignore
    let channelName = browser.config.ChannelName;
    console.log(`Validating channel name: ${channelName}`);
    //@ts-ignore
    const host = browser.config.Streams_Api_Host;

    const eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;
    const passCodeList = Object.getPrototypeOf(PeopleRestApi).constructor.addNewPasscodeListEmailAndPassRes;
    //@ts-ignore
    chai.assert(eventDetails.registration_settings.requirements["3"][0].passcodeList == passCodeList.passcode_list, 
    `Passcode List ${eventDetails.registration_settings.requirements["3"][0].passcodeList} was successfully added to Event ${eventDetails.event}`);
})

Given (/^Update the event with the ticket info$/, async function(){
  //@ts-ignore
  const host = browser.config.Streams_Api_Host;

  let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;
  
  let eventInfoDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;
    
  let sessionsArr = eventInfoDetails.sessions;
  let sesssionsIDArr = [];
  let sessionsUUIDArr = [];

  sessionsArr.forEach(element => {
      sesssionsIDArr.push(element.session);
      sessionsUUIDArr.push(element.uuid);
  });

  eventDetails.registration_steps = [
    {
      "type": "general",
      "isOn": true,
      "questions": [
        {
          "registration_question": 1,
          "channel": 0,
          "name": "First Name",
          "type": "text",
          "options": null,
          "global": true,
          "persistent": true,
          "default_value": null,
          "placeholder": null,
          "name_translation": null,
          "options_translation": null
        },
        {
          "registration_question": 2,
          "channel": 0,
          "name": "Last Name",
          "type": "text",
          "options": null,
          "global": true,
          "persistent": true,
          "default_value": null,
          "placeholder": null,
          "name_translation": null,
          "options_translation": null
        },
        {
          "registration_question": 3,
          "channel": 0,
          "name": "Email Address",
          "type": "email",
          "options": null,
          "global": true,
          "persistent": true,
          "default_value": null,
          "placeholder": null,
          "name_translation": null,
          "options_translation": null
        }
      ]
    },
    {
      "type": "profile",
      "isOn": false,
      "questions": [
        {
          "registration_question": 6,
          "channel": 0,
          "name": "Company Name",
          "type": "text",
          "options": null,
          "global": true,
          "persistent": true,
          "default_value": null
        },
        {
          "registration_question": 4,
          "channel": 0,
          "name": "Bio",
          "type": "text",
          "options": null,
          "global": true,
          "persistent": false,
          "default_value": null
        },
        {
          "registration_question": 9,
          "channel": 0,
          "name": "Fun Fact",
          "type": "text",
          "options": null,
          "global": true,
          "persistent": false,
          "default_value": null
        }
      ]
    },
    {
      "type": "avatar",
      "isOn": false
    },
    {
      "isOn":true,
      "type":"ticketing",
      "ticketing":[
         {
            "name":"Regular Ticket",
            "prices":[
               {
                  "price":1,
                  "currency":"USD",
                  "multiplier":100
               }
            ],
            "quantity":10,
            "uuid":"81727e9a-ebcc-40cb-8bd4-db151ce446e4",
            "sessions":sesssionsIDArr,
            "session_uuids":sessionsUUIDArr
         }
      ]
   }
  ]

  eventDetails = { event: eventDetails};
  const updateEvent = await UpdateEventRestApi.updateEvent(host, eventDetails);
  chai.assert(updateEvent.status === 200, `Request Successful - ${updateEvent.status}`);
  chai.expect(updateEvent.text).to.equal('OK');
  await createEventJsonFile(eventDetails);
  reporter.addStep("info", `Update event with the ticket info... is success.`)
})

Given(/^Remove ticket from the event$/, async function() {
  // Should only be run after adding a ticket. Otherwise it won't actually test removing the ticket.
  //@ts-ignore
  const host = browser.config.Streams_Api_Host;

  let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;

  let eventInfoDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;

  let sessionsArr = eventInfoDetails.sessions;
  let sesssionsIDArr = [];
  let sessionsUUIDArr = [];

  sessionsArr.forEach(element => {
    sesssionsIDArr.push(element.session);
    sessionsUUIDArr.push(element.uuid);
  });

  eventDetails.registration_steps = [
    {
      "type": "general",
      "isOn": true,
      "questions": [
        {
          "registration_question": 1,
          "channel": 0,
          "name": "First Name",
          "type": "text",
          "options": null,
          "global": true,
          "persistent": true,
          "default_value": null,
          "placeholder": null,
          "name_translation": null,
          "options_translation": null
        },
        {
          "registration_question": 2,
          "channel": 0,
          "name": "Last Name",
          "type": "text",
          "options": null,
          "global": true,
          "persistent": true,
          "default_value": null,
          "placeholder": null,
          "name_translation": null,
          "options_translation": null
        },
        {
          "registration_question": 3,
          "channel": 0,
          "name": "Email Address",
          "type": "email",
          "options": null,
          "global": true,
          "persistent": true,
          "default_value": null,
          "placeholder": null,
          "name_translation": null,
          "options_translation": null
        }
      ]
    },
    {
      "type": "profile",
      "isOn": false,
      "questions": [
        {
          "registration_question": 6,
          "channel": 0,
          "name": "Company Name",
          "type": "text",
          "options": null,
          "global": true,
          "persistent": true,
          "default_value": null
        },
        {
          "registration_question": 4,
          "channel": 0,
          "name": "Bio",
          "type": "text",
          "options": null,
          "global": true,
          "persistent": false,
          "default_value": null
        },
        {
          "registration_question": 9,
          "channel": 0,
          "name": "Fun Fact",
          "type": "text",
          "options": null,
          "global": true,
          "persistent": false,
          "default_value": null
        }
      ]
    },
    {
      "type": "avatar",
      "isOn": false
    }
  ];

  eventDetails = { event: eventDetails };
  const updateEvent = await UpdateEventRestApi.updateEvent(host, eventDetails);
  chai.assert(updateEvent.status === 200, `Request Successful - ${updateEvent.status}`);
  chai.expect(updateEvent.text).to.equal('OK');
  await createEventJsonFile(eventDetails);
  reporter.addStep('info', 'Remove ticket from the event... is success.');
});

Given(/^Update event with email confirmation required$/, async function() {
  //@ts-ignore
  const host = browser.config.Streams_Api_Host;

  let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;
  eventDetails.registration_settings.registrationConfirmation = true;
  eventDetails.registration_settings.sendEmailConfirmation = true;
  eventDetails = { event: eventDetails};
  let updateEventRes = await UpdateEventRestApi.updateEvent(host, eventDetails);
  chai.assert(updateEventRes.status === 200, `Request Successful - ${updateEventRes.status}`);
  chai.expect(updateEventRes.text).to.equal('OK');
  reporter.addStep("info", `Update event with email confirmation required... is success.`)

  const getEventRes = await CreateEventRestApi.getEventDetailsByUuid(host, eventDetails.event.uuid);
  chai.assert(getEventRes.uuid === eventDetails.event.uuid);
  chai.assert(getEventRes.registration_settings.registrationConfirmation === true);
  chai.assert(getEventRes.registration_settings.sendEmailConfirmation === true);
  await createEventJsonFile(getEventRes);
});

Given(/^Add existing Video to homepage$/, async function() {
  //@ts-ignore
  const host = browser.config.Streams_Api_Host;

  let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;
  const channelDetails = await LandingPageRestApi.getChannelVideos(host, eventDetails.channel)
  const video = channelDetails[0];

  const updatedEventWithVideo = {
    ...eventDetails,
    homepage: {
      ...eventDetails.homepage,
      modules: eventDetails.homepage.modules.map(module => module.type === 5
        ? {
          ...module,
          is_on: true,
          is_edited: true,
          content_modules: [video.video],
          modules: [video]
        }
        : module
      )
    }
  };

  eventDetails = { event: updatedEventWithVideo };
  const updateEvent = await UpdateEventRestApi.updateEvent(host, eventDetails);
  chai.assert(updateEvent.status === 200, `Request Successful - ${updateEvent.status}`);
  chai.expect(updateEvent.text).to.equal('OK');
  await createEventJsonFile(eventDetails);
  reporter.addStep('info', 'Add exisiting video to homepage... is success.');
});

Given(/^Add existing Product to homepage$/, async function() {
  //@ts-ignore
  const host = browser.config.Streams_Api_Host;

  let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;
  const productDetails = await LandingPageRestApi.getProductsDetails(host, eventDetails.channel)
  const product = productDetails[0];

  const updatedEventWithProduct = {
    ...eventDetails,
    homepage: {
      ...eventDetails.homepage,
      modules: eventDetails.homepage.modules.map(module => module.type === 4
        ? {
          ...module,
          is_on: true,
          is_edited: true,
          content_modules: [product.product],
          modules: [product]
        }
        : module
      )
    }
  };

  const putChannelProductsResponse = await ChannelRestApi.putChannelProducts(
    host,
    ['en'],
    product
  );

  chai.expect(putChannelProductsResponse).to.eql(product);

  eventDetails = { event: updatedEventWithProduct };
  const updateEvent = await UpdateEventRestApi.updateEvent(host, eventDetails);
  chai.assert(updateEvent.status === 200, `Request Successful - ${updateEvent.status}`);
  chai.expect(updateEvent.text).to.equal('OK');
  await createEventJsonFile(eventDetails);
  reporter.addStep('info', 'Add exisiting product to homepage... is success.');
});

Given(/^Add existing Speaker to homepage$/, async function() {
  //@ts-ignore
  const host = browser.config.Streams_Api_Host;

  let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;
  const speakerDetails = await LandingPageRestApi.getSpeakersDetails(host, eventDetails.channel)
  const speaker = speakerDetails[0];

  const updatedEventWIthSpeaker = {
    ...eventDetails,
    homepage: {
      ...eventDetails.homepage,
      modules: eventDetails.homepage.modules.map(module => module.type === 1
        ? {
          ...module,
          is_on: true,
          is_edited: true,
          content_modules: [speaker.speaker],
          modules: [speaker]
        }
        : module
      )
    }
  };

  eventDetails = { event: updatedEventWIthSpeaker };
  const updateEvent = await UpdateEventRestApi.updateEvent(host, eventDetails);
  chai.assert(updateEvent.status === 200, `Request Successful - ${updateEvent.status}`);
  chai.expect(updateEvent.text).to.equal('OK');
  await createEventJsonFile(eventDetails);
  reporter.addStep('info', 'Add exisiting speaker to homepage... is success.');
});

Given(/^Add existing Sponsor to homepage$/, async function() {
  //@ts-ignore
  const host = browser.config.Streams_Api_Host;

  let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;
  const sponsorDetails = await LandingPageRestApi.getSponsorsDetails(host, eventDetails.channel)
  const sponsor = sponsorDetails[0];

  const updatedEventWithSponsor = {
    ...eventDetails,
    homepage: {
      ...eventDetails.homepage,
      modules: eventDetails.homepage.modules.map(module => module.type === 6
        ? {
          ...module,
          is_on: true,
          is_edited: true,
          content_modules: [sponsor.sponsor],
          modules: [sponsor]
        }
        : module
      )
    }
  };

  const putChannelSponsorResponse = await ChannelRestApi.putChannelSponsors(
    host,
    ['en'],
    sponsor
  );

  chai.expect(putChannelSponsorResponse.sponsor).to.eql(sponsor.sponsor);

  eventDetails = { event: updatedEventWithSponsor };
  const updateEvent = await UpdateEventRestApi.updateEvent(host, eventDetails);
  chai.assert(updateEvent.status === 200, `Request Successful - ${updateEvent.status}`);
  chai.expect(updateEvent.text).to.equal('OK');
  await createEventJsonFile(eventDetails);
  reporter.addStep('info', 'Add exisiting sponsor to homepage... is success.');
});

When (/^The shared passcode is updated to the event$/, async function() {
  //@ts-ignore
  const host = browser.config.Streams_Api_Host;

  let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;

  eventDetails.registration_settings.requirements = {
    "2": {
        "gatedSessions": []
        ,
        "type": 2,
        "sharedPasscode": "Brandlive123"
        }
  }
  eventDetails.registration_on = true;

    eventDetails.required_registration_questions =[
      1,
      2,
      3,
      10
    ]

    eventDetails.registration_steps = [
        {
          "type": "general",
          "isOn": true,
          "questions": [
            {
              "registration_question": 1,
              "channel": 0,
              "name": "First Name",
              "type": "text",
              "options": null,
              "global": true,
              "persistent": true,
              "default_value": null,
              "placeholder": null,
              "name_translation": null,
              "options_translation": null
            },
            {
              "registration_question": 2,
              "channel": 0,
              "name": "Last Name",
              "type": "text",
              "options": null,
              "global": true,
              "persistent": true,
              "default_value": null,
              "placeholder": null,
              "name_translation": null,
              "options_translation": null
            },
            {
              "registration_question": 3,
              "channel": 0,
              "name": "Email Address",
              "type": "email",
              "options": null,
              "global": true,
              "persistent": true,
              "default_value": null,
              "placeholder": null,
              "name_translation": null,
              "options_translation": null
            },
            {
              "registration_question": 10,
              "channel": 0,
              "name": "Passcode",
              "type": "text",
              "options": null,
              "global": true,
              "persistent": false,
              "default_value": null,
              "placeholder": null,
              "name_translation": null,
              "options_translation": null
            }
          ]
        },
        {
          "type": "profile",
          "isOn": false,
          "questions": [
            {
              "registration_question": 6,
              "channel": 0,
              "name": "Company Name",
              "type": "text",
              "options": null,
              "global": true,
              "persistent": true,
              "default_value": null
            },
            {
              "registration_question": 4,
              "channel": 0,
              "name": "Bio",
              "type": "text",
              "options": null,
              "global": true,
              "persistent": false,
              "default_value": null
            },
            {
              "registration_question": 9,
              "channel": 0,
              "name": "Fun Fact",
              "type": "text",
              "options": null,
              "global": true,
              "persistent": false,
              "default_value": null
            }
          ]
        },
        {
          "type": "avatar",
          "isOn": false
        }
      ]

      eventDetails = { event: eventDetails};
      const updateEvent = await UpdateEventRestApi.updateEvent(host, eventDetails);
      chai.assert(updateEvent.status === 200, `Request Successful - ${updateEvent.status}`);

      const getEvent = await CreateEventRestApi.getEventDetailsByUuid(host, eventDetails.event.uuid);
      chai.assert(getEvent.uuid === eventDetails.event.uuid);
});

Then (/^The shared passcode is verified as added to event$/, async function() {
  //@ts-ignore
  let channelName = browser.config.ChannelName;
  console.log(`Validating channel name: ${channelName}`);
  //@ts-ignore
  const host = browser.config.Streams_Api_Host;

  const eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes;
  
  //@ts-ignore
  chai.assert(eventDetails.registration_settings.requirements["2"].sharedPasscode == "Brandlive123", 
  `Passcode List ${eventDetails.registration_settings.requirements["2"].sharedPasscode} was successfully added to Event ${eventDetails.event}`);
});

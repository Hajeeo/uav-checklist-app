import React, { useState, useEffect, useRef } from 'react';

// --- Icon Components ---
const Upload = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>;
const Download = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>;
const ChevronsRight = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>;
const ClipboardCheck = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></svg>;
const Plane = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" /></svg>;
const Wrench = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>;
const Car = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>;
const Wind = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" /></svg>;
const Settings = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>;
const LogOut = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;
const User = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const Home = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const PlusCircle = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>;
const Edit = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
const History = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>;
const Menu = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>;
const X = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const AlertCircle = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
const Plus = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
const CheckCircle = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>;
const Paperclip = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
const LayoutDashboard = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>;
const RefreshCw = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 0 1 9-9c2.39 0 4.68.94 6.34 2.61"/><path d="M21 3v6h-6"/><path d="M21 12a9 9 0 0 1-9 9c-2.39 0-4.68-.94-6.34-2.61"/><path d="M3 21v-6h6"/></svg>;
const Trash2 = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;
const FileText = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const Camera = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>;
const Package = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;


// --- Mock Database for Checklist ID ---
const missionDatabase = {
  '04092025_P001_001': {
    RPIC: 'Dedy Pranata Sembiring',
    'Observer / Analyst': 'Ajeng Adventiaputri',
    'UAV Model': 'CHCNAV X500',
    Payload: 'AA9'
  },
  '05092025_P002_002': {
    RPIC: 'Andrizal',
    'Observer / Analyst': 'Andrizal',
    'UAV Model': 'DJI Matrice 350',
    Payload: 'AA450'
  },
  '06092025_P003_003': {
      RPIC: 'Jaka Firmanto',
      'Observer / Analyst': 'Bagus Wijanarko',
      'UAV Model': 'CHCNAV P330',
      Payload: 'AA15'
  }
};


// --- Checklist Data Structure ---
const vehicleChecklistsData = [
    {
        id: 'vehicle',
        title: 'Vehicle',
        icon: Car,
        sections: [
          { title: 'Vehicle Safety', items: [
            { id: 'vehicle-1-1', text: 'Pre-Departure Inspection', description: 'Conduct a 360-degree walk-around inspection for any visible damage, leaks, or defects.' },
            { id: 'vehicle-1-2', text: 'Tires', description: 'Check pressure and inspect for adequate tread depth, lug nuts, and any signs of damage or excessive wear.' },
            { id: 'vehicle-1-3', text: 'Brakes, Steering, Lights', description: 'Confirm functionality of brakes, steering response, and all exterior lights (headlights, brake lights, turn signals).' },
            { id: 'vehicle-1-4', text: 'Fuel Tank', description: 'Ensure the fuel tank\'s lid on modified vehicle is locked.' },
            { id: 'vehicle-1-5', text: 'Fluid Levels', description: 'Ensure fuel, oil, coolant, and windshield washer fluid are adequate for the mission.' },
          ]},
          { title: 'Safety & Emergency Equipment', items: [
            { id: 'vehicle-2-1', text: 'First-Aid Kit', description: 'Verify the kit is on board, adequately and fully stocked.' },
            { id: 'vehicle-2-2', text: 'Fire Extinguisher', description: 'Confirm the extinguisher is present, fully charged, within its service date, and securely mounted.' },
            { id: 'vehicle-2-3', text: 'Recovery Tools', description: 'Ensure basic recovery equipment (e.g., jack, lug wrench, spare tire) is present and functional.' },
            { id: 'vehicle-2-4', text: 'Portable Generator', description: 'Verify the generator is securely fastened to prevent shifting. Check fuel level and safe storage of extra fuel in an approved container.' },
          ]},
          { title: 'Equipment Loading & Security', items: [
            { id: 'vehicle-3-1', text: 'Protective Cases', description: 'Confirm all UAV components are packed in durable, watertight, and shock-resistant cases.' },
            { id: 'vehicle-3-2', text: 'Secure Placement', description: 'Ensure cases are placed in a dry, secure area of the vehicle, not stacked, and braced to prevent movement.' },
            { id: 'vehicle-3-3', text: 'Load Fastening', description: 'Ensure that the entire cargo load is securely fastened with straps or netting to prevent any shifting during transit.' },
            { id: 'vehicle-3-4', text: 'Environmental Protection', description: 'Ensure the entire cargo load is covered to protect it from rain, dust, and direct sunlight.' },
          ]},
          { title: 'Personnel & Journey Management', items: [
            { id: 'vehicle-4-1', text: 'Cabin Seating', description: 'Confirm all team members are seated within the main cabin of the vehicle.' },
            { id: 'vehicle-4-2', text: 'Seatbelt Use', description: 'Verify that the driver and all passengers are wearing seatbelts before the vehicle departs.' },
            { id: 'vehicle-4-3', text: 'Cargo Bed Policy', description: 'Explicitly confirm that no personnel will ride in the open cargo bed of the vehicle under any circumstances.' },
            { id: 'vehicle-4-4', text: 'Route Planning', description: 'Confirm the travel route has been planned using navigation tools and is understood by the driver and RPIC.' },
          ]},
          { title: 'Signatures', isSignature: true, items: [] }, // Signature section
        ]
    }
];
const flightChecklistsData = [
  {
    id: 'pre-flight',
    title: 'Pre-Flight',
    icon: Plane,
    sections: [
      { title: 'P - Pilot / Personnel', items: [
        { id: 'pre-flight-1-1', text: 'I - Illness', description: 'I am free from any sickness, symptoms, or fatigue that could impair performance.' },
        { id: 'pre-flight-1-2', text: 'M - Medication', description: 'I am not under the influence of any prescription or medication that could affect my judgment or abilities.' },
        { id: 'pre-flight-1-3', text: 'S - Stress', description: 'I am free from any psychological or emotional distress that could distract me from the mission.' },
        { id: 'pre-flight-1-4', text: 'A - Alcohol', description: 'I have not consumed alcohol within the last 8 hours and am not under its influence.' },
        { id: 'pre-flight-1-5', text: 'F - Fatigue', description: 'I am well-rested and not feeling tired or drowsy.' },
        { id: 'pre-flight-1-6', text: 'E - Emotion', description: 'I am emotionally stable and can maintain a professional and focused demeanor.' },
        { id: 'pre-flight-1-7', text: 'Certification & Readiness', description: 'My Remote Pilot Certificate (RPC) is valid and on my person. I am familiar with the aircraft and mission profile.' },
        { id: 'pre-flight-1-8', text: 'Crew Briefing', description: 'A comprehensive pre-flight briefing has been conducted with all crew members.' },
      ]},
      { title: 'A - Aircraft', items: [
        { id: 'pre-flight-2-1', text: 'Airframe & Structure', description: 'Conduct a full visual inspection for cracks, stress marks, or damage. Check landing gear and secure.' },
        { id: 'pre-flight-2-2', text: 'Propulsion System', description: 'Propellers are free of chips/cracks and are securely fastened. Motor are clear of debris and rotate smoothly.' },
        { id: 'pre-flight-2-3', text: 'Power System', description: 'All batteries (Aircraft, RC, GCS) are fully charged and inspected for damage. Connectors are clean and secure.' },
        { id: 'pre-flight-2-4', text: 'Payload System Check', description: 'For Imaging/Sensing Payload, it is securely mounted, clean, and functioning. For Spraying Payload, tank is clean, nozzle is correct, hoses are connected without leaks, pump is operational.' },
        { id: 'pre-flight-2-5', text: 'System Software', description: 'Aircraft and RC firmware are updated to the latest version. Flight control software is configured.' },
        { id: 'pre-flight-2-6', text: 'Data Storage', description: 'SD card is formatted, has sufficient space, and is properly inserted into the aircraft.' },
      ]},
      { title: 'V - Environment', items: [
        { id: 'pre-flight-3-1', text: 'Weather Conditions', description: 'Weather forecast has been checked. Current conditions are within operational limits. Wind speed verified with an anemometer.' },
        { id: 'pre-flight-3-2', text: 'Airspace & Permits', description: 'Airspace has been checked. All required flight permits and authorizations (e.g., DNP) are approved and active.' },
        { id: 'pre-flight-3-3', text: 'Take-Off/Landing Zone', description: 'The TOLZ is clear, secure, and clear of obstructions and non-essential personnel for a minimum 10-meter radius.' },
        { id: 'pre-flight-3-4', text: 'Obstacle Identification', description: 'All potential ground and air obstacles (e.g., power lines, trees, tall buildings) in the operational area have been identified and noted.' },
        { id: 'pre-flight-3-5', text: 'GNSS & Compass', description: 'A strong satellite lock is achieved (>12 satellites). Compass and IMU are calibrated if required by the system or due to a new location.' },
      ]},
      { title: 'E - External Pressures', items: [
        { id: 'pre-flight-4-1', text: 'Mission Objectives', description: 'The mission objectives are clear, realistic, and can be achieved without compromising safety standards.' },
        { id: 'pre-flight-4-2', text: 'Client/Management Pressure', description: 'I have acknowledged any external pressures and confirmed safety will remain the top priority over mission completion.' },
        { id: 'pre-flight-4-3', text: 'Contingency Plan', description: 'Emergency procedures, alternative landing sites, and communication protocols have been reviewed and understood by the entire crew.' },
      ]},
      { title: 'Final System & Takeoff Checks', items: [
        { id: 'pre-flight-5-1', text: 'Final System Check', description: 'Aircraft and controller are powered on and linked. Check for any error messages or warnings on the GCS.' },
        { id: 'pre-flight-5-2', text: 'Takeoff Area Clear', description: 'Final visual scan of the TOL area and surrounding airspace is complete. A final "Clear Prop!" call is made.' },
      ]},
      { title: 'Declaration & Signature', isSignature: true, items: [] }
    ]
  },
  {
    id: 'in-flight',
    title: 'In-Flight',
    icon: Wind,
    note: 'This checklist is a guide for continuous monitoring during flight, not a list of sequential tasks. The PIC and VO must constantly assess these items throughout the mission\'s duration.',
    sections: [
      { title: 'Aircraft & Systems Monitoring', items: [
        { id: 'in-flight-1-1', text: 'Critical Telemetry Data', description: 'Constantly monitor the GCS for: Battery (Voltage & %), GNSS Satellites (>6), RC & Video Signal (Strong), Altitude (AGL), and Speed.' },
        { id: 'in-flight-1-2', text: 'System Warnings', description: 'Remain vigilant for any audio or visual alerts from the GCS (e.g., compass error, motor overload, etc.).' },
        { id: 'in-flight-1-3', text: 'Flight Behavior', description: 'Observe that the drone is flying stably, responding correctly to command.' },
        { id: 'in-flight-1-4', text: 'Battery & Motor Temperature', description: 'Monitor critical component temperatures via telemetry to prevent overheating.' },
      ]},
      { title: 'Environment & Airspace Monitoring', items: [
        { id: 'in-flight-2-1', text: 'Visual Line of Sight (VLOS)', description: 'Ensure direct, unaided visual contact with the UAV is maintained at all times by either the PIC or VO.' },
        { id: 'in-flight-2-2', text: 'Beyond Visual Line of Sight (BVLOS)', description: 'For BVLOS operations, continuously monitor the command and control link, telemetry data integrity, and the status of Detect and Avoid (DAA) systems.' },
        { id: 'in-flight-2-3', text: 'Airspace Scan', description: 'The VO must actively and continuously scan the airspace around the UAV for potential hazards such as manned aircraft, other drones, or large birds.' },
        { id: 'in-flight-2-4', text: 'Weather Condition Changes', description: 'Observe for any unexpected changes in on-site weather (e.g., increase in wind speed, approaching rain clouds, fog).' },
        { id: 'in-flight-2-5', text: 'Ground Hazards', description: 'Monitor the area below and around the flight path for any new, unexpected hazards, such as people, vehicles, or animals entering the operational area.' },
      ]},
      { title: 'Mission & Crew Monitoring', items: [
        { id: 'in-flight-3-1', text: 'Mission Progress', description: 'Ensure the UAV is correctly following the programmed flight path and that data acquisition (images, video, spray) is proceeding as planned.' },
        { id: 'in-flight-3-2', text: 'Crew Communication (CRM)', description: 'Maintain clear, concise, and continuous communication between the PIC and VO, including required ATS communication (if needed). Periodically confirm observations and status.' },
        { id: 'in-flight-3-3', text: 'Overall Situational Awareness', description: 'Periodically confirm that the entire crew shares the same understanding of the mission status, UAV position, and current environmental conditions.' },
      ]}
    ]
  },
  {
    id: 'post-flight',
    title: 'Post-Flight',
    icon: ClipboardCheck,
    sections: [
      { title: 'Immediate Post-Landing', items: [
        { id: 'post-flight-1-1', text: 'Secure Landing Zone', description: 'Confirm the aircraft has landed in a safe, secure area, away from any hazards.' },
        { id: 'post-flight-1-2', text: 'Data & Log Finalization', description: 'Stop the GCS screen recording and verify the file is saved successfully. Confirm the flight log is saved.' },
        { id: 'post-flight-1-3', text: 'Power Down Sequence', description: 'Power down the aircraft first, then power down the remote controller (GCS) and any other ground equipment.' },
      ]},
      { title: 'Data Management', items: [
        { id: 'post-flight-2-1', text: 'Secure Data Media', description: 'Safely remove the SD card(s) and/or any other data storage media from the aircraft and payload.' },
        { id: 'post-flight-2-2', text: 'Immediate Data Backup', description: 'Transfer all raw data to a field laptop or secure storage device. Create an initial backup immediately on-site if possible.' },
      ]},
      { title: 'Physical Inspection', items: [
        { id: 'post-flight-3-1', text: 'Airframe & Structure', description: 'Conduct a thorough visual inspection of the drone\'s body, arms/wings, and landing gear for any new signs of damage, cracks, or stress.' },
        { id: 'post-flight-3-2', text: 'Propulsion System', description: 'Inspect propellers for any chips, cracks, or wear. Check motors for debris and ensure they rotate smoothly by hand.' },
        { id: 'post-flight-3-3', text: 'Battery Handling', description: 'Carefully remove the battery from the aircraft. Inspect it for any swelling, punctures, or damage. Note the final voltage for proper storage charging later.' },
      ]},
      { title: 'Payload-Specific Procedures', items: [
        { id: 'post-flight-4-1', text: 'For Imaging/Sensing Payloads', description: 'Clean the camera lens and sensor of any dust and debris. Secure the gimbal with its clamp if removed; store the payload carefully in its protective case.' },
        { id: 'post-flight-4-2', text: 'For Spraying Payloads', description: 'Follow all chemical safety procedures. Empty any remaining liquid from the tank. Flush the entire system (tank, hoses, pump, nozzles) with clean water to prevent clogging and corrosion.' },
      ]},
      { title: 'Disassembly & Packing', items: [
        { id: 'post-flight-5-1', text: 'Disassemble Aircraft', description: 'Carefully remove the propellers. Fold the drone\'s arms and secure any moving parts according to the manufacturer\'s guidelines.' },
        { id: 'post-flight-5-2', text: 'Clean Equipment', description: 'Clean any dust, dirt, or residue from the aircraft, controller, and all support equipment before packing.' },
        { id: 'post-flight-5-3', text: 'Secure Packing', description: 'Place all equipment securely into their respective protective cases. Ensure all components are protected for transport.' },
      ]},
      { title: 'Final Documentation', items: [
        { id: 'post-flight-6-1', text: 'Log Maintenance Issues', description: 'Document any damage, system warnings, or abnormal performance observed during the mission or post-flight inspection in the maintenance log.' },
        { id: 'post-flight-6-2', text: 'Complete Flight Log', description: 'Complete the flight logbook with all required details: flight duration, battery cycles used, mission outcome, and any significant events.' },
      ]},
      { title: 'Declaration & Signature', isSignature: true, items: [] }
    ]
  },
  {
    id: 'qa1_checklist',
    title: 'QA1 Checklist',
    icon: CheckCircle,
    sections: [
        { title: 'Data Quality & Completeness', items: [
            { id: 'qa1-1-1', text: 'Data Coverage', description: 'Confirm the collected data covers the entire area of interest as per the mission plan.' },
            { id: 'qa1-1-2', text: 'Image/Data Quality', description: 'Check for blurriness, over/under exposure, or other data corruptions. Ensure data is usable.' },
            { id: 'qa1-1-3', text: 'Log Files Integrity', description: 'Verify that flight logs are complete, saved correctly, and do not show critical errors.' },
        ]},
        { title: 'Mission Documentation Review', items: [
            { id: 'qa1-2-1', text: 'Checklist Completion', description: 'Ensure all previous checklists (Pre-flight, In-flight, Post-flight) are fully completed and signed.' },
            { id: 'qa1-2-2', text: 'Remarks Review', description: 'Review all remarks made during the mission. Acknowledge any issues noted.' },
        ]},
        { title: 'Analyst Signature', isSignature: true, items: [] }
    ]
  }
];
const maintenanceChecklistsData = [
  {
    id: 'maintenance',
    title: 'Maintenance',
    icon: Wrench,
    sections: [
      { title: 'Airframe & Structure', items: [
        { id: 'maint-1-1', text: 'Fuselage / Main Body', description: 'Inspect for cracks, stress marks, loose screws, or structural damage.' },
        { id: 'maint-1-2', text: 'Arms / Wings', description: 'Check for structural integrity, secure attachment, and any signs of damage.' },
        { id: 'maint-1-3', text: 'Landing Gear', description: 'Inspect for cracks, damage, and ensure it is securely attached and functional.' },
      ]},
      { title: 'Propulsion System', items: [
        { id: 'maint-2-1', text: 'Motors', description: 'Check for debris, smooth rotation without resistance, and secure mounting.' },
        { id: 'maint-2-2', text: 'Propellers', description: 'Inspect for chips, cracks, warping, or any signs of wear. Ensure they are securely fastened.' },
        { id: 'maint-2-3', text: 'ESCs / Wiring', description: 'Inspect all wiring and wiring for frays, cuts, or loose connections.' },
      ]},
      { title: 'Power System', items: [
        { id: 'maint-3-1', text: 'Aircraft Batteries', description: 'Visually inspect for swelling, punctures, or damage. Log cycle count.' },
        { id: 'maint-3-2', text: 'GCS / RC Battery', description: 'Visually inspect for damage and ensure it holds a proper charge.' },
        { id: 'maint-3-3', text: 'Connector & Terminals', description: 'Inspect all battery and system connectors for corrosion, dirt, or wear.' },
        { id: 'maint-3-4', text: 'Charging Station', description: 'Inspect for damage and verify correct functionality.' },
      ]},
      { title: 'Flight Control & Navigation', items: [
        { id: 'maint-4-1', text: 'GPS / GNSS Module', description: 'Check for secure mounting and clear view of the sky.' },
        { id: 'maint-4-2', text: 'IMU & Compass', description: 'Perform calibration as required by manufacturer or flight control software.' },
        { id: 'maint-4-3', text: 'Flight Controller', description: 'Ensure it is securely mounted and connections are firm.' },
      ]},
      { title: 'Payload System', items: [
        { id: 'maint-5-1', text: 'General Payload Mount', description: 'Inspect for secure attachment to the airframe. Check all data and power cables.' },
        { id: 'maint-5-2', text: 'A. For Imaging/Sensing Payload', subtext: 'Gimbal System', description: 'Check for smooth, unrestricted movement in all axes. Inspect for damage.' },
        { id: 'maint-5-3', text: 'B. For Spraying Payload', subtext: 'Liquid Tank', description: 'Inspect for leaks, cracks, and ensure the lid provides a proper seal.' },
        { id: 'maint-5-4', text: '', subtext: 'Nozzles', description: 'Inspect for blockages and test for a proper and even spray pattern (using water).' },
      ]},
      { title: 'GCS / Remote Controller', items: [
        { id: 'maint-6-1', text: 'Casing & Antennas', description: 'Inspect for physical damage. Ensure antennas are securely attached.' },
        { id: 'maint-6-2', text: 'Controls (Sticks, Dials)', description: 'Verify smooth, correct mechanical operation without sticking.' },
        { id: 'maint-6-3', text: 'Display Screen', description: 'Check for damage and proper functionality.' },
      ]},
      { title: 'Software & Firmware', items: [
        { id: 'maint-7-1', text: 'Aircraft Firmware', description: 'Check and install any required updates from the manufacturer.' },
        { id: 'maint-7-2', text: 'GCS / RC Firmware', description: 'Check for and install any required updates.' },
        { id: 'maint-7-3', text: 'Flight Control App', description: 'Ensure the application is updated to the latest version.' },
      ]},
      { title: 'Safety systems', items: [
        { id: 'maint-8-1', text: 'Failsafe (RTH) Settings', description: 'Verify settings (e.g., RTH altitude) are appropriate for planned operations.' },
        { id: 'maint-8-2', text: 'Obstacle Avoidance Sensors', description: 'Clean sensors and verify they are enabled and functioning in the software.' },
      ]},
    ]
  }
];

const allChecklistData = [...vehicleChecklistsData, ...flightChecklistsData, ...maintenanceChecklistsData];

const locationData = {
    "North": ["SRG", "RSG", "SRY", "MDU", "PPD"],
    "South": ["SJG", "BAS", "CER", "PER", "SLJ", "LBJ"],
    "West": ["UKU", "LGB", "TEE", "TEW", "LON", "LOS", "NGD"],
    "East": ["PEN", "PES", "TSB", "TSK", "MRE", "MRW", "MER", "BYS"],
    "North West": ["GRG", "PPR", "SKB", "PLS", "PLU", "SBI", "LBO", "RPT", "KBU"]
};

const driverData = [
    { name: 'Budi Santoso', licensePlate: 'BM 1111 RGE' },
    { name: 'Siti Lestari', licensePlate: 'BM 2222 RGE' },
];

// --- Helper & UI Components ---

const Spinner = () => <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div></div>;
const Icon = ({ name, className }) => { const IconComponent = name; return <IconComponent className={className} />; };

const LoginPage = ({ onLogin }) => {
    const [sapId, setSapId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        setTimeout(() => {
            if (sapId.trim() !== '' && password.trim() !== '') {
                onLogin(sapId);
            } else {
                setError('SAP ID and password cannot be empty.');
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="max-w-sm w-full mx-auto">
                <div className="flex justify-center items-center space-x-3 mb-8">
                    <Plane className="w-10 h-10 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800">UAV Flight Ops</h1>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Internal Login</h2>
                    {error && <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-lg text-sm" role="alert"><p>{error}</p></div>}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SAP ID</label>
                            <input type="text" value={sapId} onChange={(e) => setSapId(e.target.value)} placeholder="Enter SAP ID" required className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition flex items-center justify-center disabled:bg-gray-400 h-12">
                            {isLoading ? <Spinner /> : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const HomePage = ({ draft, history, onStartNew, onContinueDraft, onEditHistory, onExportHistory, onUploadHistory, onDiscardDraft, onShowAuditTrail, isUploading, isExporting, sapId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredHistory = history
        .filter(mission => {
            if (filterStatus === 'uploaded') return mission.isUploaded;
            if (filterStatus === 'not_uploaded') return !mission.isUploaded && !mission.isPendingUpload;
            if (filterStatus === 'pending') return mission.isPendingUpload;
            return true;
        })
        .filter(mission => {
            const missionName = mission.missionHeader.Mission || '';
            const location = mission.missionHeader.Location || '';
            const rpic = mission.missionHeader.RPIC || '';
            const searchLower = searchTerm.toLowerCase();

            return missionName.toLowerCase().includes(searchLower) ||
                   location.toLowerCase().includes(searchLower) ||
                   rpic.toLowerCase().includes(searchLower);
        });

    const getUploadButton = (mission) => {
        if (mission.isUploaded) {
            return (
                <button disabled className="text-sm px-3 py-1 rounded-full flex items-center space-x-1.5 bg-green-100 text-green-700 cursor-default">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Uploaded</span>
                </button>
            );
        }
        if (mission.isPendingUpload) {
            return (
                <button disabled className="text-sm px-3 py-1 rounded-full flex items-center space-x-1.5 bg-yellow-100 text-yellow-700 cursor-default">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Pending Sync</span>
                </button>
            );
        }
        if (isUploading === mission.id) {
            return (
                <button disabled className="text-sm px-3 py-1 rounded-full flex items-center space-x-1.5 bg-indigo-100 text-indigo-700">
                    <Spinner />
                    <span>Uploading...</span>
                </button>
            );
        }
        return (
            <button onClick={() => onUploadHistory(mission.id)} className="text-sm px-3 py-1 rounded-full flex items-center space-x-1.5 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
            </button>
        );
    };

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Welcome, {sapId}</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        {draft ? (
                            <>
                                <h2 className="text-xl font-bold text-gray-700 mb-2 flex items-center"><Edit className="w-5 h-5 mr-3 text-blue-500"/> Continue Draft</h2>
                                <p className="text-gray-600 mb-4">You have a mission checklist in progress.</p>
                                <div className="bg-gray-100 p-4 rounded-lg mb-4 border border-gray-200">
                                    <p className="font-semibold text-gray-800">{draft.missionHeader?.Mission || 'Untitled Mission'}</p>
                                    <p className="text-sm text-gray-500">{draft.missionHeader?.Date || 'No date set'}</p>
                                </div>
                                <div className="flex space-x-4">
                                    <button onClick={onContinueDraft} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition">
                                        Continue Checklist
                                    </button>
                                    <button onClick={onDiscardDraft} className="w-full bg-red-100 text-red-700 py-3 rounded-lg font-semibold shadow-sm hover:bg-red-200 transition">
                                        Discard Draft
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold text-gray-700 mb-2 flex items-center"><PlusCircle className="w-5 h-5 mr-3 text-green-500"/> Start New Checklist</h2>
                                <p className="text-gray-600 mb-4">Begin a new checklist for your mission.</p>
                                <button onClick={onStartNew} className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition">
                                    Start New
                                </button>
                            </>
                        )}
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center"><History className="w-5 h-5 mr-3 text-purple-500"/> Mission History</h2>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <input type="text" placeholder="Search by Mission, Location, RPIC..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500" />
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full sm:w-48 p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500">
                                <option value="all">All Statuses</option>
                                <option value="uploaded">Uploaded</option>
                                <option value="not_uploaded">Not Uploaded</option>
                                <option value="pending">Pending Sync</option>
                            </select>
                        </div>
                        {filteredHistory.length > 0 ? (
                            <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
                                {filteredHistory.map((mission) => (
                                    <li key={mission.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                                        <div className="flex justify-between items-start flex-wrap gap-2">
                                            <div>
                                                <p className="font-bold text-gray-800 text-md">{mission.missionHeader.Mission || 'Completed Mission'}</p>
                                                <p className="text-sm text-gray-500">{mission.missionHeader.Date || 'N/A'}</p>
                                                {mission.generatedId && <p className="text-xs text-gray-500 mt-1 font-mono">{mission.generatedId}</p>}
                                            </div>
                                            <div className="flex items-center space-x-2 flex-shrink-0 flex-wrap gap-2">
                                                {getUploadButton(mission)}
                                                <button onClick={() => onShowAuditTrail(mission)} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors flex items-center space-x-1.5">
                                                    <FileText className="w-3.5 h-3.5" />
                                                    <span>Audit</span>
                                                </button>
                                                <button onClick={() => onExportHistory(mission.id)} disabled={isExporting} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors flex items-center space-x-1.5 disabled:bg-gray-200 disabled:text-gray-500">
                                                    <Download className="w-3.5 h-3.5" />
                                                    <span>Export</span>
                                                </button>
                                                <button onClick={() => onEditHistory(mission.id)} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">Edit</button>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-700 space-y-1.5">
                                            <p><span className="font-semibold">Location:</span> {mission.missionHeader.Location || 'N/A'}</p>
                                            <p><span className="font-semibold">Crew:</span> {mission.missionHeader.RPIC || 'N/A'} / {mission.missionHeader['Observer / Analyst'] || 'N/A'}</p>
                                            <p><span className="font-semibold">UAV:</span> {mission.missionHeader['UAV Model'] || 'N/A'} / {mission.missionHeader.Payload || 'N/A'}</p>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-3 text-right">Last Edited: {mission.lastEdited}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8">
                                <History className="w-12 h-12 mx-auto text-gray-300" />
                                <p className="text-gray-500 mt-2">No completed missions found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChecklistItem = React.memo(({ item, value, onChange }) => {
    const { id, text, description } = item;
    const statusValue = value?.status || null;
    const borderColor = statusValue === 'OK' ? 'border-green-500' : statusValue === 'NA' ? 'border-red-500' : 'border-gray-200';

    return (
        <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden border border-gray-200">
            <div className={`p-4 border-l-4 ${borderColor}`}>
                <div className="mb-4">
                    <p className="font-semibold text-gray-800">{text}</p>
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => onChange(id, { status: 'OK' })} className={`w-full py-3 text-sm font-bold rounded-lg transition-colors ${statusValue === 'OK' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-green-100'}`}>OK</button>
                    <button onClick={() => onChange(id, { status: 'NA' })} className={`w-full py-3 text-sm font-bold rounded-lg transition-colors ${statusValue === 'NA' ? 'bg-red-500 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-red-100'}`}>N/A</button>
                </div>
            </div>
        </div>
    );
});

const SignaturePad = ({ title, onSave, signatureData }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const getPosition = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        if (event.touches && event.touches.length > 0) {
            return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
            };
        }
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    const startDrawing = (event) => {
        const { x, y } = getPosition(event);
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (event) => {
        if (!isDrawing) return;
        const { x, y } = getPosition(event);
        const ctx = canvasRef.current.getContext('2d');
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const endDrawing = () => {
        setIsDrawing(false);
        const dataUrl = canvasRef.current.toDataURL();
        onSave(dataUrl);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onSave(null);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            if (!canvas.parentElement) return;
            const { width } = canvas.parentElement.getBoundingClientRect();
            canvas.width = width;
            canvas.height = 150; // Fixed height
    
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
    
            if (signatureData) {
                const img = new Image();
                img.src = signatureData;
                img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);

    }, [signatureData]);

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={endDrawing}
                    onMouseLeave={endDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={endDrawing}
                    className="w-full h-[150px] cursor-crosshair"
                />
            </div>
            <button onClick={clearCanvas} className="mt-2 text-sm text-blue-600 hover:underline">Clear Signature</button>
        </div>
    );
};


const ChecklistContent = ({ checklist, data, onItemChange, onSectionRemarkChange, onAttachmentChange, onAttachmentDelete, onSectionOkAll, headerHeight, onSaveSignature, currentFlightIndex, totalFlights, onFinish, areAllSignaturesComplete }) => {
    const totalItems = checklist.sections.reduce((acc, section) => section.isSignature ? acc : acc + section.items.length, 0);
    const completedItems = Object.values(data.items || {}).filter(item => item.status).length;
    const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    const contentRef = useRef(null);

    const handleOkAllAndScroll = (section, sectionIndex) => {
        onSectionOkAll(section);

        setTimeout(() => {
            if (contentRef.current) {
                const allOkButtons = Array.from(contentRef.current.querySelectorAll('.ok-all-button'));
                const currentButtonIndex = allOkButtons.findIndex(btn => parseInt(btn.dataset.sectionIndex) === sectionIndex);

                if (currentButtonIndex !== -1 && currentButtonIndex < allOkButtons.length - 1) {
                    const nextButton = allOkButtons[currentButtonIndex + 1];
                    nextButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }, 100);
    };
    
    return (
        <div className="p-4 md:p-6" ref={contentRef}>
            <div className="sticky top-0 bg-gray-100/80 backdrop-blur-sm z-10 pt-4 pb-3 -mx-4 -mt-4 px-4 md:-mx-6 md:px-6" style={{ top: `0px` }}>
                 <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">{checklist.title} Checklist</h2>
                     {totalItems > 0 && <span className="text-sm font-medium text-gray-600 bg-gray-200 px-2.5 py-1 rounded-full">{completedItems} / {totalItems}</span>}
                </div>
                {totalItems > 0 && <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div></div>}
            </div>
            {checklist.note && <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 my-6 rounded-r-lg text-sm" role="alert"><p>{checklist.note}</p></div>}
            
            {checklist.sections.map((section, sectionIndex) => {
                if (section.isSignature) return null;
                return (
                    <div key={section.title} className="mb-8 mt-6">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-700">{section.title}</h3>
                            {section.items.length > 0 && 
                                <button 
                                    onClick={() => handleOkAllAndScroll(section, sectionIndex)}
                                    data-section-index={sectionIndex}
                                    className="ok-all-button bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                    OK All
                                </button>
                            }
                        </div>
                        {section.items.map(item => <ChecklistItem key={item.id} item={item} value={(data.items || {})[item.id]} onChange={(itemId, newStatus) => onItemChange(itemId, newStatus)} />)}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Remarks for {section.title}</label>
                            <div className="border border-gray-300 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                                <textarea placeholder="Add any remarks for this section..." value={(data.sections && data.sections[section.title]?.remarks) || ''} onChange={(e) => onSectionRemarkChange(section.title, e.target.value)} className="w-full p-3 border-none rounded-t-lg text-sm focus:ring-0" rows="3"></textarea>
                                <div className="border-t p-2 bg-gray-50 rounded-b-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-grow space-y-1">
                                            {data.sections && data.sections[section.title]?.attachments?.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between bg-gray-200 p-1.5 rounded-md text-sm">
                                                    {file.preview ? <img src={file.preview} alt={file.name} className="w-8 h-8 rounded-md object-cover mr-2" /> : <Paperclip className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />}
                                                    <span className="truncate flex-grow">{file.name}</span>
                                                    <button onClick={() => onAttachmentDelete(section.title, index)} className="ml-2 p-1 rounded-full hover:bg-red-200 text-red-500"><X className="w-3 h-3" /></button>
                                                </div>
                                            ))}
                                        </div>
                                        <label className="cursor-pointer bg-white hover:bg-gray-100 text-gray-700 text-sm font-medium py-2 px-3 border border-gray-300 rounded-lg shadow-sm ml-2 flex-shrink-0">
                                            <Paperclip className="w-4 h-4 inline-block mr-1" />
                                            Attach
                                            <input type="file" className="hidden" onChange={(e) => onAttachmentChange(section.title, e.target.files[0])} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* Render Signature sections at the end */}
            {checklist.id === 'vehicle' && (
                <div className="mt-8">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Signatures</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SignaturePad title="Driver's Signature" onSave={(dataUrl) => onSaveSignature('driver', dataUrl)} signatureData={data.signatures?.driver} />
                        <SignaturePad title="RPIC's Signature" onSave={(dataUrl) => onSaveSignature('rpic', dataUrl)} signatureData={data.signatures?.rpic} />
                    </div>
                </div>
            )}

            {checklist.id === 'pre-flight' && currentFlightIndex === 0 && (
                 <div className="mt-8">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Declaration & Signature</h3>
                    <p className="text-sm text-gray-700 bg-gray-100 p-4 rounded-lg mb-4">I hereby certify that all pre-checklist checks have been completed in accordance with the Standard Operating Procedure and that the mission is <b className="font-extrabold">Safe to proceed.</b></p>
                    <SignaturePad title="RPIC's Signature" onSave={(dataUrl) => onSaveSignature('rpic', dataUrl)} signatureData={data.signatures?.rpic} />
                </div>
            )}

            {checklist.id === 'post-flight' && currentFlightIndex === totalFlights - 1 && (
                 <div className="mt-8">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Declaration & Signature</h3>
                     <p className="text-sm text-gray-700 bg-gray-100 p-4 rounded-lg mb-4">I hereby certify that all post-flight checks have been completed in accordance with the Standard Operating Procedure and all equipment is <b className="font-extrabold">accounted for and safely stored.</b></p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SignaturePad title="RPIC's Signature" onSave={(dataUrl) => onSaveSignature('rpic', dataUrl)} signatureData={data.signatures?.rpic} />
                        <SignaturePad title="Observer's Signature" onSave={(dataUrl) => onSaveSignature('observer', dataUrl)} signatureData={data.signatures?.observer} />
                    </div>
                </div>
            )}

            {checklist.id === 'qa1_checklist' && currentFlightIndex === totalFlights - 1 && (
                 <div className="mt-8">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Analyst Declaration & Signature</h3>
                     <p className="text-sm text-gray-700 bg-gray-100 p-4 rounded-lg mb-4">I hereby certify that I have reviewed the mission data and documentation, and it meets the quality standards required.</p>
                    <SignaturePad title="Analyst's Signature" onSave={(dataUrl) => onSaveSignature('analyst', dataUrl)} signatureData={data.signatures?.analyst} />
                </div>
            )}

            {checklist.id === 'maintenance' && (
                <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Mission Completion</h3>
                    <p className="text-center text-gray-600 mb-6">Review all checklists and confirm the mission is complete before saving.</p>
                    <button
                        onClick={onFinish}
                        disabled={!areAllSignaturesComplete}
                        className="w-full bg-green-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {!areAllSignaturesComplete ? 'All Signatures Required' : 'Finish & Save Mission'}
                    </button>
                </div>
            )}
        </div>
    );
};

const MissionSettings = ({ missionHeader, onHeaderChange, onStart, errors }) => {

    const handleIdChange = (e) => {
        const id = e.target.value;
        onHeaderChange('Checklist ID', id);

        const data = missionDatabase[id];
        if(data) {
            onHeaderChange('RPIC', data.RPIC);
            onHeaderChange('Observer / Analyst', data['Observer / Analyst']);
            onHeaderChange('UAV Model', data['UAV Model']);
            onHeaderChange('Payload', data.Payload);
        } else {
            onHeaderChange('RPIC', '');
            onHeaderChange('Observer / Analyst', '');
            onHeaderChange('UAV Model', '');
            onHeaderChange('Payload', '');
        }
    }
    
    const handleDriverChange = (e) => {
        const driverName = e.target.value;
        const selectedDriver = driverData.find(d => d.name === driverName);
        onHeaderChange('Driver', driverName);
        onHeaderChange('License Plate', selectedDriver ? selectedDriver.licensePlate : '');
    };

    return (
        <div className="p-4 md:p-6 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Mission Details</h2>
                <div className="space-y-4">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Checklist ID</label>
                        <select value={missionHeader['Checklist ID'] || ''} onChange={handleIdChange} className={`w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 transition-shadow`}>
                            <option value="">Select an ID...</option>
                            {Object.keys(missionDatabase).map(id => (<option key={id} value={id}>{id}</option>))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
                        <input type='text' value={missionHeader.Mission || ''} onChange={(e) => onHeaderChange('Mission', e.target.value)} placeholder="Enter Mission..." className={`w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 transition-shadow`}/>
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type='date' value={missionHeader.Date || ''} onChange={(e) => onHeaderChange('Date', e.target.value)} className={`w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 transition-shadow`}/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <select
                            value={missionHeader.Location || ''}
                            onChange={(e) => onHeaderChange('Location', e.target.value)}
                            className={`w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 transition-shadow`}
                        >
                            <option value="">Select a location...</option>
                            {Object.entries(locationData).map(([region, locations]) => (
                                <optgroup label={region} key={region}>
                                    {locations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>


                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">RPIC</label>
                            <input type='text' value={missionHeader.RPIC || ''} readOnly className={`w-full p-3 border border-gray-300 rounded-lg text-sm bg-gray-100`}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Observer / Analyst</label>
                            <input type='text' value={missionHeader['Observer / Analyst'] || ''} readOnly className={`w-full p-3 border border-gray-300 rounded-lg text-sm bg-gray-100`}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">UAV Model</label>
                            <input type='text' value={missionHeader['UAV Model'] || ''} readOnly className={`w-full p-3 border border-gray-300 rounded-lg text-sm bg-gray-100`}/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Payload</label>
                            <input type='text' value={missionHeader.Payload || ''} readOnly className={`w-full p-3 border border-gray-300 rounded-lg text-sm bg-gray-100`}/>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Driver</label>
                            <select value={missionHeader.Driver || ''} onChange={handleDriverChange} className={`w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 transition-shadow`}>
                                 <option value="">Select a driver...</option>
                                 {driverData.map(driver => (<option key={driver.name} value={driver.name}>{driver.name}</option>))}
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                            <input type='text' value={missionHeader['License Plate'] || ''} readOnly className={`w-full p-3 border border-gray-300 rounded-lg text-sm bg-gray-100`}/>
                        </div>
                    </div>
                </div>
                 <div className="mt-8">
                    <button onClick={onStart} disabled={Object.keys(errors).length > 0} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none">
                       <span>{Object.keys(errors).length > 0 ? 'Fill All Details to Start' : 'Go to Checklists'}</span>
                        <ChevronsRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const MissionDashboard = ({ activeMission, getChecklistStatus, setView }) => {
    const calculateProgress = (checklistData, checklistSet) => {
        const sourceChecklist = checklistSet.find(c => c.id === checklistData.id);
        if (!sourceChecklist || !checklistData) return { progress: 0, status: 'Not Started' };
        const totalItems = sourceChecklist.sections.filter(s => !s.isSignature).reduce((acc, section) => acc + section.items.length, 0);
        const completedItems = Object.values(checklistData.items || {}).filter(item => item.status).length;
        const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
        let status = 'Not Started';
        if (progress >= 100) status = 'Completed';
        else if (progress > 0) status = 'In Progress';
        return { progress, status };
    };

    const getProgressColor = (status) => {
        if (status === 'Completed') return 'bg-green-600';
        if (status === 'In Progress') return 'bg-yellow-500';
        return 'bg-gray-200';
    };

    const vehicleInfo = calculateProgress(activeMission.vehicleChecklists.vehicle, vehicleChecklistsData);
    const maintenanceInfo = calculateProgress(activeMission.maintenanceChecklists.maintenance, maintenanceChecklistsData);

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Mission Overview</h2>
                <p className="text-lg text-gray-600 mb-6">{activeMission.missionHeader.Mission || 'Untitled Mission'}</p>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Overall Progress</h3>
                        <div className="space-y-4">
                           <div>
                               <div className="flex justify-between items-center mb-1">
                                   <span className="text-md font-medium text-gray-700">Vehicle</span>
                                   <span className="text-sm font-medium text-gray-500">{Math.round(vehicleInfo.progress)}%</span>
                               </div>
                               <div className="w-full bg-gray-200 rounded-full h-2.5"><div className={`${getProgressColor(vehicleInfo.status)} h-2.5 rounded-full`} style={{width: `${vehicleInfo.progress}%`}}></div></div>
                           </div>
                           {activeMission.flights.map((flight, index) => {
                               const flightProgresses = flightChecklistsData.map(c => calculateProgress(flight.checklists[c.id], flightChecklistsData));
                               const avgFlightProgress = flightProgresses.reduce((a, b) => a + b.progress, 0) / flightChecklistsData.length;
                               let flightStatus = 'Not Started';
                               if (avgFlightProgress >= 100) flightStatus = 'Completed';
                               else if (avgFlightProgress > 0) flightStatus = 'In Progress';
                               
                               return (
                                   <div key={flight.id}>
                                       <div className="flex justify-between items-center mb-1">
                                           <span className="text-md font-medium text-gray-700">Flight {index + 1}</span>
                                           <span className="text-sm font-medium text-gray-500">{Math.round(avgFlightProgress)}%</span>
                                       </div>
                                       <div className="w-full bg-gray-200 rounded-full h-2.5"><div className={`${getProgressColor(flightStatus)} h-2.5 rounded-full`} style={{width: `${avgFlightProgress}%`}}></div></div>
                                   </div>
                               );
                           })}
                           <div>
                               <div className="flex justify-between items-center mb-1">
                                   <span className="text-md font-medium text-gray-700">Maintenance</span>
                                   <span className="text-sm font-medium text-gray-500">{Math.round(maintenanceInfo.progress)}%</span>
                               </div>
                               <div className="w-full bg-gray-200 rounded-full h-2.5"><div className={`${getProgressColor(maintenanceInfo.status)} h-2.5 rounded-full`} style={{width: `${maintenanceInfo.progress}%`}}></div></div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({ isOpen, onClose, currentView, setView, onGoHome, isMissionDetailsIncomplete, showNotification, activeMission, currentFlightIndex, setCurrentFlightIndex, onAddFlight, onRemoveFlight, getChecklistStatus }) => {
    const handleNavClick = (targetView) => {
        if (isMissionDetailsIncomplete && !['settings', 'dashboard'].includes(targetView)) {
            showNotification({ message: 'Please complete all Mission Details before proceeding to checklists.', type: 'error' });
            setView('settings');
        } else {
            setView(targetView);
        }
        onClose();
    };
    
    const getStatusClass = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800 hover:bg-green-200';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
            default: return 'text-gray-700 hover:bg-gray-100';
        }
    };

    return (
        <>
            <div className={`fixed inset-0 bg-black/60 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
            <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-40 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 flex justify-between items-center border-b flex-shrink-0">
                    <h2 className="font-bold text-lg">Navigation</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X className="w-6 h-6" /></button>
                </div>
                <nav className="p-4 flex-1 overflow-y-auto">
                    <ul>
                        <li><button onClick={() => { onGoHome(false); onClose(); }} className="w-full flex items-center space-x-3 p-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"><Home className="w-5 h-5 text-gray-500" /><span>Home</span></button></li>
                        <li className="my-2 border-t"></li>
                        
                        {activeMission ? (
                             <>
                                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mission</h3>
                                <li><button onClick={() => handleNavClick('settings')} className={`w-full flex items-center justify-between p-3 text-sm font-medium rounded-md ${currentView === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}><div className="flex items-center space-x-3"><Settings className="w-5 h-5 text-gray-500" /><span>Mission Details</span></div></button></li>
                                <li><button onClick={() => handleNavClick('dashboard')} className={`w-full flex items-center justify-between p-3 text-sm font-medium rounded-md ${currentView === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}><div className="flex items-center space-x-3"><LayoutDashboard className="w-5 h-5 text-gray-500" /><span>Dashboard</span></div></button></li>
                                <li className="my-2 border-t"></li>
                                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vehicle</h3>
                                {vehicleChecklistsData.map(c => (<li key={c.id}><button onClick={() => handleNavClick(c.id)} className={`w-full flex items-center justify-between p-3 text-sm font-medium rounded-md transition-colors ${currentView === c.id ? 'bg-blue-100 text-blue-700' : ''} ${getStatusClass(getChecklistStatus('vehicle', c.id))}`}><div className="flex items-center space-x-3"><Icon name={c.icon} className="w-5 h-5" /><span>{c.title}</span></div></button></li>))}
                                <li className="my-2 border-t"></li>
                                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Flights</h3>
                                {activeMission.flights.map((flight, index) => (
                                   <li key={flight.id}>
                                        <div className="flex items-center">
                                            <button onClick={() => setCurrentFlightIndex(index)} className={`w-full flex items-center justify-between p-3 text-sm font-medium rounded-md transition-colors ${currentFlightIndex === index ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                                                <div className="flex items-center space-x-3"><Plane className="w-5 h-5" /><span>Flight {index + 1}</span></div>
                                            </button>
                                            {activeMission.flights.length > 1 && (
                                                <button onClick={() => onRemoveFlight(index)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full ml-1">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        {currentFlightIndex === index && (
                                             <div className="pl-6 mt-1 border-l-2 border-gray-200 ml-3">
                                                {flightChecklistsData.map(c => (<button key={c.id} onClick={() => handleNavClick(c.id)} className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${currentView === c.id ? 'font-semibold text-blue-700' : ''} ${getStatusClass(getChecklistStatus('flight', c.id, index))}`}><div className="flex items-center space-x-3"><Icon name={c.icon} className="w-4 h-4" /><span>{c.title}</span></div></button>))}
                                            </div>
                                        )}
                                   </li>
                                ))}
                                <li><button onClick={() => { onAddFlight(); }} className="w-full flex items-center space-x-3 p-3 text-sm font-medium text-green-600 hover:bg-green-50 rounded-md mt-2"><Plus className="w-5 h-5" /><span>Add Flight</span></button></li>
                                <li className="my-2 border-t"></li>
                                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Maintenance</h3>
                                {maintenanceChecklistsData.map(c => (<li key={c.id}><button onClick={() => handleNavClick(c.id)} className={`w-full flex items-center justify-between p-3 text-sm font-medium rounded-md transition-colors ${currentView === c.id ? 'bg-blue-100 text-blue-700' : ''} ${getStatusClass(getChecklistStatus('maintenance', c.id))}`}><div className="flex items-center space-x-3"><Icon name={c.icon} className="w-5 h-5" /><span>{c.title}</span></div></button></li>))}
                             </>
                        ) : (
                            <>
                                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mission</h3>
                                <p className="px-3 py-2 text-sm text-gray-400">Start a new mission from the Home page.</p>
                                <li className="my-2 border-t"></li>
                                <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Verification</h3>
                                <li><button onClick={() => { handleNavClick('asset_verification'); }} className={`w-full flex items-center justify-between p-3 text-sm font-medium rounded-md ${currentView === 'asset_verification' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}><div className="flex items-center space-x-3"><Package className="w-5 h-5 text-gray-500" /><span>Asset Verification</span></div></button></li>
                           </>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    );
};

const Notification = ({ notification, onDismiss }) => {
    if (!notification || !notification.message) return null;
    const baseClasses = "fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center justify-between";
    const typeClasses = {
        error: "bg-red-100 border-l-4 border-red-500 text-red-700",
        success: "bg-green-100 border-l-4 border-green-500 text-green-700",
        info: "bg-blue-100 border-l-4 border-blue-500 text-blue-700",
    };
    return (<div className={`${baseClasses} ${typeClasses[notification.type] || typeClasses.info}`}><div className="flex items-center"><AlertCircle className="w-6 h-6 mr-3" /><p>{notification.message}</p></div><button onClick={onDismiss} className="ml-4 p-1 rounded-full hover:bg-black/10"><X className="w-5 h-5" /></button></div>);
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, children }) => {
    if (!isOpen) return null;
    return (<div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"><div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full"><h3 className="text-lg font-bold text-gray-800">{title}</h3><div className="mt-2 text-sm text-gray-600">{children}</div><div className="mt-6 flex justify-end space-x-3"><button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button><button onClick={onConfirm} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Confirm</button></div></div></div>);
};

const AuditTrailModal = ({ isOpen, onClose, mission }) => {
    if (!isOpen || !mission) return null;

    const formatTimestamp = (ts) => ts ? new Date(ts).toLocaleString() : 'N/A';
    
    const formatAuditKey = (key) => {
        const parts = key.split('-');
        let name = parts.slice(0, -1).join(' ');
        if (key.startsWith('pre-flight') || key.startsWith('in-flight') || key.startsWith('post-flight') || key.startsWith('qa1_checklist')) {
             const flightIndex = parseInt(parts[parts.length - 1], 10);
             name = `Flight ${flightIndex + 1} - ${parts.slice(0,-1).join(' ')}`
        } else {
            name = key;
        }
        return name.replace(/\b\w/g, l => l.toUpperCase());
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full">
                <h3 className="text-lg font-bold text-gray-800">Audit Trail for "{mission.missionHeader.Mission}"</h3>
                <div className="mt-4 max-h-96 overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Activity</th>
                                <th scope="col" className="px-6 py-3">Started At</th>
                                <th scope="col" className="px-6 py-3">Finished At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mission.auditTrail && Object.entries(mission.auditTrail).sort((a,b) => a[1].startTime - b[1].startTime).map(([key, value]) => (
                                <tr key={key} className="bg-white border-b">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{formatAuditKey(key)}</td>
                                    <td className="px-6 py-4">{formatTimestamp(value.startTime)}</td>
                                    <td className="px-6 py-4">{formatTimestamp(value.endTime)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Close</button>
                </div>
            </div>
        </div>
    );
};

const assetTypes = ["UAV", "Remote Controller", "Battery", "Equipment Case", "Other"];

// --- Asset Verification Component from your file ---
const AssetVerificationPage = ({ sapId, showNotification }) => {
  const [assetType, setAssetType] = useState('');
  const [assetId, setAssetId] = useState('');
  const [photos, setPhotos] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [recentVerifications, setRecentVerifications] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load verification history from local storage on component mount
  useEffect(() => {
    try {
      const savedVerifications = localStorage.getItem('assetVerifications');
      if (savedVerifications) {
        setRecentVerifications(JSON.parse(savedVerifications));
      }
    } catch (error) {
      console.error("Failed to parse asset verifications from localStorage", error);
      localStorage.removeItem('assetVerifications');
    }
  }, []);

  const handlePhotoChange = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      showNotification({ message: 'Please select a valid image file.', type: 'error' });
      return;
    }
    if (photos.length >= 8) {
        showNotification({ message: 'You can upload a maximum of 8 photos.', type: 'error' });
        return;
    }

    const getGeoLocation = new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by this browser."));
        }
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    getGeoLocation
        .then(position => {
            const { latitude, longitude } = position.coords;
            return { latitude, longitude };
        })
        .catch(error => {
            console.error("Geolocation error:", error);
            showNotification({ message: 'Could not get location. It will not be saved with the photo.', type: 'error' });
            return null; // Resolve with null if location fails
        })
        .then(location => {
            const newPhoto = {
                file,
                preview: URL.createObjectURL(file),
                name: file.name,
                timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
                location
            };
            setPhotos(prevPhotos => [...prevPhotos, newPhoto]);
        });
  };

  const handlePhotoDelete = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };
  
  const resetForm = (nextAssetType = '') => {
      setAssetType(nextAssetType);
      setAssetId('');
      setPhotos([]);
      setRemarks('');
      setEditingIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assetType || !assetId || photos.length === 0) {
      showNotification({ message: 'Asset Type, Asset ID, and at least one photo are required.', type: 'error' });
      return;
    }

    const newVerification = {
      id: editingIndex !== null ? recentVerifications[editingIndex].id : Date.now(),
      assetId,
      assetType,
      user: sapId,
      timestamp: new Date().toLocaleString(),
      photoData: photos.map(p => ({ name: p.name, timestamp: p.timestamp, location: p.location })),
      remarks,
      isUploaded: false,
    };
    
    let updatedVerifications;
    if (editingIndex !== null) {
        updatedVerifications = [...recentVerifications];
        updatedVerifications[editingIndex] = newVerification;
        showNotification({ message: `Verification for asset ${assetId} has been updated.`, type: 'success' });
    } else {
        updatedVerifications = [newVerification, ...recentVerifications].slice(0, 10); // Keep the last 10
        showNotification({ message: `Verification for asset ${assetId} has been saved.`, type: 'success' });
    }
    
    setRecentVerifications(updatedVerifications);
    localStorage.setItem('assetVerifications', JSON.stringify(updatedVerifications));
    
    // Auto-advance to the next asset type
    const currentIndex = assetTypes.indexOf(assetType);
    const nextIndex = (currentIndex + 1) % assetTypes.length;
    resetForm(assetTypes[nextIndex]);
  };

  const handleEdit = (index) => {
      const itemToEdit = recentVerifications[index];
      setAssetType(itemToEdit.assetType);
      setAssetId(itemToEdit.assetId);
      setRemarks(itemToEdit.remarks);
      setPhotos([]); // Photos must be re-uploaded for security/simplicity
      setEditingIndex(index);
      showNotification({ message: `Editing: ${itemToEdit.assetId}. Please re-attach photos.`, type: 'info' });
      window.scrollTo(0, 0); // Scroll to top to see the form
  };
  
  const handleBulkUpload = () => {
      const itemsToUpload = recentVerifications.filter(item => !item.isUploaded);
      if (itemsToUpload.length === 0) {
          showNotification({ message: 'No new verifications to upload.', type: 'info' });
          return;
      }

      setIsUploading(true);
      showNotification({ message: `Uploading ${itemsToUpload.length} verification(s)...`, type: 'info' });

      setTimeout(() => {
          const updatedVerifications = recentVerifications.map(item => 
              !item.isUploaded ? { ...item, isUploaded: true } : item
          );

          setRecentVerifications(updatedVerifications);
          localStorage.setItem('assetVerifications', JSON.stringify(updatedVerifications));
          setIsUploading(false);
          showNotification({ message: `Successfully uploaded ${itemsToUpload.length} verification(s).`, type: 'success' });
      }, 2000); // Simulate 2-second upload
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Asset Storage Verification</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Verification Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Asset Type</label>
              <select value={assetType} onChange={(e) => setAssetType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select an asset...</option>
                {assetTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Asset ID / Serial Number</label>
              <input type="text" value={assetId} onChange={(e) => setAssetId(e.target.value)} placeholder="Enter unique asset ID" className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* Photo Upload Section */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Verification Photos</label>
                <p className="text-xs text-gray-500 mb-2">Take photos of the asset using the device camera.</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-2">
                    {photos.map((photo, index) => (
                        <div key={index} className="relative aspect-square group">
                            <img src={photo.preview} alt={`preview-${index}`} className="w-full h-full object-cover rounded-lg shadow-md" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <p className="truncate">{photo.timestamp}</p>
                                {photo.location && <p>Lat: {photo.location.latitude.toFixed(4)}</p>}
                                {photo.location && <p>Lon: {photo.location.longitude.toFixed(4)}</p>}
                            </div>
                            <button type="button" onClick={() => handlePhotoDelete(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"><X className="w-3 h-3" /></button>
                        </div>
                    ))}
                </div>
                <label className="w-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg shadow-sm flex items-center justify-center space-x-2 transition-colors">
                    <Camera className="w-5 h-5" />
                    <span>Take Photo</span>
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files[0] && handlePhotoChange(e.target.files[0])} />
                </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Optional)</label>
              <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="e.g., Found a minor scratch on the right arm." className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500" rows="3"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {editingIndex !== null ? 'Update Verification' : 'Submit for Storage'}
            </button>
          </form>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-700 flex items-center"><History className="w-5 h-5 mr-3 text-purple-500"/> Recent Verifications</h2>
            <button
                onClick={handleBulkUpload}
                disabled={isUploading || recentVerifications.filter(v => !v.isUploaded).length === 0}
                className="flex items-center space-x-2 bg-indigo-600 text-white py-2 px-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
            >
                <Upload className="w-4 h-4"/>
                <span>{isUploading ? 'Uploading...' : 'Upload All'}</span>
            </button>
          </div>
          {recentVerifications.length > 0 ? (
            <ul className="space-y-3">
              {recentVerifications.map((item, index) => (
                <li key={item.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold text-gray-800">{item.assetType}: {item.assetId}</p>
                        <p className="text-sm text-gray-500">By {item.user} on {item.timestamp}</p>
                        <p className="text-sm text-gray-500">{item.photoData?.length || 0} photo(s) attached.</p>
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={() => handleEdit(index)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"><Edit className="w-4 h-4"/></button>
                        {item.isUploaded && (
                           <div className="p-2 text-green-500" title="Uploaded">
                               <CheckCircle className="w-4 h-4"/>
                           </div>
                        )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
                <History className="w-12 h-12 mx-auto text-gray-300" />
                <p className="text-gray-500 mt-2">No recent verifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Application Component ---
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sapId, setSapId] = useState('');
    const [view, setView] = useState('home');
    const [currentChecklistTab, setCurrentChecklistTab] = useState('settings');
    const [currentFlightIndex, setCurrentFlightIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: 'info' });
    const [missionHeaderErrors, setMissionHeaderErrors] = useState({});
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });
    const [auditTrailModalState, setAuditTrailModalState] = useState({ isOpen: false, mission: null });
    const [draft, setDraft] = useState(null);
    const [history, setHistory] = useState([]);
    const [activeMission, setActiveMission] = useState(null);
    const [isUploading, setIsUploading] = useState(null);
    const [isExporting, setIsExporting] = useState(false);
    const headerRef = useRef(null);
    const scrollPositions = useRef({});
    const mainContentRef = useRef(null);

    useEffect(() => {
        if (mainContentRef.current && view === 'checklist') {
            const scrollKey = `${currentChecklistTab}-${currentFlightIndex}`;
            if (scrollPositions.current[scrollKey]) {
                mainContentRef.current.scrollTop = scrollPositions.current[scrollKey];
            } else {
                mainContentRef.current.scrollTop = 0;
            }
        }
    }, [currentChecklistTab, currentFlightIndex, view]);
    
    const handleSetView = (targetView) => {
        if (mainContentRef.current && view === 'checklist') {
            const scrollKey = `${currentChecklistTab}-${currentFlightIndex}`;
            scrollPositions.current[scrollKey] = mainContentRef.current.scrollTop;
        }
        
        if (allChecklistData.some(c => c.id === targetView) || ['settings', 'dashboard'].includes(targetView)) {
            setView('checklist');
            setCurrentChecklistTab(targetView);
        } else {
            setView(targetView);
        }
    };

    const getInitialChecklistData = (checklistSet) => {
        const checklists = {};
        checklistSet.forEach(cl => {
            const sections = {};
            cl.sections.forEach(sec => { sections[sec.title] = { remarks: '', attachments: [] }; });
            checklists[cl.id] = { items: {}, sections: {}, signatures: {} }; 
        });
        return checklists;
    };

    const getInitialMissionData = () => ({ 
        id: Date.now(),
        missionHeader: {
            Date: new Date().toISOString().slice(0, 10)
        }, 
        vehicleChecklists: getInitialChecklistData(vehicleChecklistsData),
        flights: [{ id: 1, checklists: getInitialChecklistData(flightChecklistsData) }],
        maintenanceChecklists: getInitialChecklistData(maintenanceChecklistsData),
        lastEdited: new Date().toLocaleString(),
        auditTrail: {},
    });

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
        script.async = true;
        document.head.appendChild(script);
        return () => { document.head.removeChild(script); }
    }, []);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            const pendingMissions = history.filter(m => m.isPendingUpload);
            if (pendingMissions.length > 0) {
                setNotification({ message: 'You are back online. Syncing pending missions...', type: 'info' });
                pendingMissions.forEach(mission => {
                    setTimeout(() => {
                        setHistory(prev => prev.map(m => m.id === mission.id ? { ...m, isUploaded: true, isPendingUpload: false } : m));
                        setNotification({ message: `Mission "${mission.missionHeader.Mission}" synced successfully!`, type: 'success'});
                    }, 2000);
                });
            } else {
                 setNotification({ message: 'You are back online.', type: 'success' });
            }
        };
        const handleOffline = () => {
            setIsOnline(false);
            setNotification({ message: 'You are offline. Data will be saved locally.', type: 'error' });
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [history]);

    useEffect(() => {
        if (activeMission) localStorage.setItem('activeMission', JSON.stringify(activeMission));
        else localStorage.removeItem('activeMission');
    }, [activeMission]);

    useEffect(() => {
        const savedMission = localStorage.getItem('activeMission');
        if (savedMission) {
            try {
                setActiveMission(JSON.parse(savedMission));
                setView('checklist');
                setCurrentChecklistTab('dashboard');
            } catch (e) {
                console.error("Failed to parse active mission from localStorage", e);
                localStorage.removeItem('activeMission');
            }
        }
        const savedHistory = localStorage.getItem('missionHistory');
        if(savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error("Failed to parse mission history from localStorage", e);
                localStorage.removeItem('missionHistory');
            }
        }
        const savedDraft = localStorage.getItem('draftMission');
        if(savedDraft) {
            try {
                setDraft(JSON.parse(savedDraft));
            } catch(e) {
                console.error("Failed to parse draft from localStorage", e);
                localStorage.removeItem('draftMission');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('missionHistory', JSON.stringify(history));
    }, [history]);
    
    useEffect(() => {
        if (draft) localStorage.setItem('draftMission', JSON.stringify(draft));
        else localStorage.removeItem('draftMission');
    }, [draft]);

    useEffect(() => {
        if (activeMission) {
            const errors = {};
            const requiredFields = ['Mission', 'Date', 'Location', 'Driver', 'License Plate', 'RPIC', 'Observer / Analyst', 'UAV Model', 'Payload'];
            
            requiredFields.forEach(field => {
                 if (!activeMission.missionHeader[field]?.trim()) {
                    errors[field] = `${field} is required.`;
                }
            });
            setMissionHeaderErrors(errors);
        }
    }, [activeMission]);

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => setNotification({ message: '', type: 'info' }), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    // Audit Trail: End Time Logic
    useEffect(() => {
        if (!activeMission) return;
    
        const checkCompletion = (auditKey, data, sourceData) => {
            const checklistId = auditKey.split('-')[0];
            const sourceChecklist = sourceData.find(c => c.id === checklistId);
            if (!sourceChecklist || !data) return;

            const sections = sourceChecklist.sections.filter(s => !s.isSignature);
            const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
            const completedItems = Object.keys(data.items || {}).length;
    
            if (totalItems > 0 && completedItems >= totalItems && activeMission.auditTrail[auditKey]?.startTime && !activeMission.auditTrail[auditKey]?.endTime) {
                setActiveMission(prev => ({
                    ...prev,
                    auditTrail: {
                        ...prev.auditTrail,
                        [auditKey]: {
                            ...prev.auditTrail[auditKey],
                            endTime: Date.now()
                        }
                    }
                }));
            }
        };
    
        if(activeMission.vehicleChecklists.vehicle) checkCompletion('vehicle', activeMission.vehicleChecklists.vehicle, vehicleChecklistsData);
        activeMission.flights.forEach((flight, index) => {
            Object.keys(flight.checklists).forEach(checklistId => {
                checkCompletion(`${checklistId}-${index}`, flight.checklists[checklistId], flightChecklistsData);
            });
        });
        if(activeMission.maintenanceChecklists.maintenance) checkCompletion('maintenance', activeMission.maintenanceChecklists.maintenance, maintenanceChecklistsData);
    
    }, [activeMission]);


    const handleLogin = (id) => { setSapId(id); setIsLoggedIn(true); };
    const handleLogout = () => { setIsLoggedIn(false); setSapId(''); setDraft(null); setHistory([]); setView('home'); localStorage.clear(); };
    const handleStartNew = () => { setActiveMission(getInitialMissionData()); handleSetView('settings'); setCurrentFlightIndex(0); };
    const handleContinueDraft = () => { setActiveMission(draft); setDraft(null); handleSetView('dashboard'); setCurrentFlightIndex(0); };
    const handleEditHistory = (missionId) => {
        const missionToEdit = history.find(m => m.id === missionId);
        if (missionToEdit) { setActiveMission(missionToEdit); handleSetView('dashboard'); setCurrentFlightIndex(0); }
    };
    
    const generateMissionId = (missionHeader, history) => {
        const checklistId = missionHeader['Checklist ID'];
        if (!checklistId || !missionHeader.Location) {
            return `INCOMPLETE_DATA_${Date.now()}`;
        }
        
        const locationCode = (missionHeader.Location.substring(0, 3)).toUpperCase();
        
        const missionCountForId = history.filter(
            m => m.missionHeader['Checklist ID'] === checklistId
        ).length;
        
        const missionNumber = String(missionCountForId + 1).padStart(2, '0');

        return `${checklistId}_${locationCode}_${missionNumber}`;
    };
    
    const handleGoHome = (isFinished = false) => {
        if (activeMission) {
            if (isFinished && !areAllSignaturesComplete()) {
                setNotification({ message: "Please complete all required signatures before finishing the mission.", type: 'error' });
                handleSetView('vehicle'); // Go to first checklist with signatures
                return;
            }
            let updatedMission = { ...activeMission, lastEdited: new Date().toLocaleString() };
            if (isFinished) {
                if (!updatedMission.generatedId) {
                    updatedMission.generatedId = generateMissionId(updatedMission.missionHeader, history);
                }
                const finishedMission = { ...updatedMission, isUploaded: updatedMission.isUploaded || false, isPendingUpload: updatedMission.isPendingUpload || false };
                const existingIndex = history.findIndex(m => m.id === finishedMission.id);
                if (existingIndex > -1) {
                    const newHistory = [...history];
                    newHistory[existingIndex] = finishedMission;
                    setHistory(newHistory);
                } else {
                    setHistory(prev => [finishedMission, ...prev]);
                }
                setDraft(null);
                setNotification({ message: "Mission saved successfully!", type: 'success' });
            } else {
                setDraft(updatedMission);
            }
            setActiveMission(null);
        }
        setView('home');
    };

    const handleHeaderChange = (field, value) => {
         setActiveMission(prev => {
            const newHeader = { ...prev.missionHeader, [field]: value };
            
            if (field === 'Checklist ID') {
                const data = missionDatabase[value];
                if (data) {
                    Object.assign(newHeader, data);
                     setTimeout(() => setNotification({ message: `Data for ${value} loaded successfully.`, type: 'success' }), 100);
                } else if (value === "") { // Clear fields if "Select an ID" is chosen
                    newHeader.RPIC = '';
                    newHeader['Observer / Analyst'] = '';
                    newHeader['UAV Model'] = '';
                    newHeader['Payload'] = '';
                }
            }

            return { ...prev, missionHeader: newHeader };
        });
    };
    
    const updateChecklistData = (checklistId, updateLogic, flightIdx = currentFlightIndex) => {
        setActiveMission(prev => {
            const newMission = JSON.parse(JSON.stringify(prev));
            let targetChecklists;
            if (vehicleChecklistsData.some(c => c.id === checklistId)) targetChecklists = newMission.vehicleChecklists;
            else if (maintenanceChecklistsData.some(c => c.id === checklistId)) targetChecklists = newMission.maintenanceChecklists;
            else targetChecklists = newMission.flights[flightIdx].checklists;
            
            if (!targetChecklists[checklistId]) {
                 targetChecklists[checklistId] = { items: {}, sections: {}, signatures: {} };
            }

            updateLogic(targetChecklists[checklistId]);
            return newMission;
        });
    };

    const handleItemStatusChange = (checklistId, itemId, newStatus) => {
        const auditKey = flightChecklistsData.some(c => c.id === checklistId) ? `${checklistId}-${currentFlightIndex}` : checklistId;
        if (activeMission && !activeMission.auditTrail[auditKey]) {
            setActiveMission(prev => ({
                ...prev,
                auditTrail: {
                    ...prev.auditTrail,
                    [auditKey]: { startTime: Date.now(), endTime: null }
                }
            }));
        }
        
        updateChecklistData(checklistId, checklist => {
            checklist.items[itemId] = { ...(checklist.items[itemId] || {}), ...newStatus };
        });
    };

    const handleSectionOkAll = (checklistId, section) => {
        const auditKey = flightChecklistsData.some(c => c.id === checklistId) ? `${checklistId}-${currentFlightIndex}` : checklistId;
        if (activeMission && !activeMission.auditTrail[auditKey]) {
            setActiveMission(prev => ({
                ...prev,
                auditTrail: {
                    ...prev.auditTrail,
                    [auditKey]: { startTime: Date.now(), endTime: null }
                }
            }));
        }

        updateChecklistData(checklistId, checklist => {
            section.items.forEach(item => {
                checklist.items[item.id] = { ...(checklist.items[item.id] || {}), status: 'OK' };
            });
        });
    };

    const handleSectionRemarkChange = (checklistId, sectionTitle, remarks) => updateChecklistData(checklistId, checklist => {
         if (!checklist.sections[sectionTitle]) checklist.sections[sectionTitle] = { remarks: '', attachments: [] };
        checklist.sections[sectionTitle].remarks = remarks;
    });

    const handleAttachmentChange = (checklistId, sectionTitle, file) => {
        if (!file) return;
        const newAttachment = { name: file.name, size: file.size, type: file.type, preview: null };
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                newAttachment.preview = reader.result;
                updateChecklistData(checklistId, checklist => {
                    if (!checklist.sections[sectionTitle]) checklist.sections[sectionTitle] = { remarks: '', attachments: [] };
                    if (!checklist.sections[sectionTitle].attachments) checklist.sections[sectionTitle].attachments = [];
                    checklist.sections[sectionTitle].attachments.push(newAttachment);
                });
            };
            reader.readAsDataURL(file);
        } else {
            updateChecklistData(checklistId, checklist => {
                if (!checklist.sections[sectionTitle]) checklist.sections[sectionTitle] = { remarks: '', attachments: [] };
                if (!checklist.sections[sectionTitle].attachments) checklist.sections[sectionTitle].attachments = [];
                checklist.sections[sectionTitle].attachments.push(newAttachment);
            });
        }
    };
    
    const handleAttachmentDelete = (checklistId, sectionTitle, attachmentIndex) => updateChecklistData(checklistId, checklist => {
        if(checklist.sections[sectionTitle] && checklist.sections[sectionTitle].attachments) {
            checklist.sections[sectionTitle].attachments.splice(attachmentIndex, 1);
        }
    });

    const handleSaveSignature = (checklistId, role, dataUrl, flightIdx = currentFlightIndex) => {
        updateChecklistData(checklistId, checklist => {
            if (!checklist.signatures) {
                checklist.signatures = {};
            }
            checklist.signatures[role] = dataUrl;
        }, flightIdx);
    };

    const handleAddFlight = () => {
        setActiveMission(prev => {
            const newFlight = { id: (prev.flights[prev.flights.length - 1]?.id || 0) + 1, checklists: getInitialChecklistData(flightChecklistsData) };
            const updatedFlights = [...prev.flights, newFlight];
            setCurrentFlightIndex(updatedFlights.length - 1);
            handleSetView('pre-flight');
            return { ...prev, flights: updatedFlights };
        });
    };

    const handleRemoveFlight = (indexToRemove) => {
        confirmAndExecute('Remove Flight', `Are you sure you want to remove Flight ${indexToRemove + 1}? This action cannot be undone.`, () => {
             setActiveMission(prev => {
                const newFlights = prev.flights.filter((_, index) => index !== indexToRemove);
                let newFlightIndex = currentFlightIndex;
                if(currentFlightIndex === indexToRemove){
                    newFlightIndex = Math.max(0, indexToRemove - 1);
                } else if(currentFlightIndex > indexToRemove) {
                    newFlightIndex = currentFlightIndex - 1;
                }
                setCurrentFlightIndex(newFlightIndex);
                handleSetView('dashboard');
                return { ...prev, flights: newFlights };
            });
            setNotification({ message: `Flight ${indexToRemove + 1} removed.`, type: 'info' });
        });
    };

    const handleStartChecklists = () => {
        if (Object.keys(missionHeaderErrors).length > 0) {
            const firstError = Object.keys(missionHeaderErrors)[0];
            setNotification({ message: `Please complete all Mission Details. '${firstError}' is missing.`, type: 'error' });
        }
        else handleSetView('dashboard');
    };
    
    const isMissionDetailsIncomplete = activeMission && Object.keys(missionHeaderErrors).length > 0;

    const areAllSignaturesComplete = () => {
        if (!activeMission) return false;
        const { vehicleChecklists, flights } = activeMission;

        // 1. Vehicle signatures
        if (!vehicleChecklists.vehicle?.signatures?.driver || !vehicleChecklists.vehicle?.signatures?.rpic) return false;
        
        // 2. Check if flights exist
        if (!flights || flights.length === 0) return false;

        const firstFlight = flights[0];
        const lastFlight = flights[flights.length - 1];

        // 3. Pre-flight signature on Flight 1
        if (!firstFlight.checklists['pre-flight']?.signatures?.rpic) return false;

        // 4. Post-flight signatures on the last flight
        if (!lastFlight.checklists['post-flight']?.signatures?.rpic || !lastFlight.checklists['post-flight']?.signatures?.observer) return false;

        // 5. QA1 signature on the last flight
        if (!lastFlight.checklists['qa1_checklist']?.signatures?.analyst) return false;

        return true;
    };


    const getChecklistStatus = (type, checklistId, flightIndex = null) => {
        if (!activeMission) return 'Not Started';
        let checklistData, checklistSet;
        if (type === 'vehicle') { checklistData = activeMission.vehicleChecklists[checklistId]; checklistSet = vehicleChecklistsData; }
        else if (type === 'maintenance') { checklistData = activeMission.maintenanceChecklists[checklistId]; checklistSet = maintenanceChecklistsData; }
        else if (type === 'flight' && activeMission.flights[flightIndex]) { checklistData = activeMission.flights[flightIndex].checklists[checklistId]; checklistSet = flightChecklistsData; }
        if (!checklistData || !checklistSet) return 'Not Started';
        const sourceChecklist = checklistSet.find(c => c.id === checklistId);
        if (!sourceChecklist) return 'Not Started';
        const totalItems = sourceChecklist.sections.filter(s => !s.isSignature).reduce((acc, section) => acc + section.items.length, 0);
        const completedItems = Object.values(checklistData.items || {}).filter(item => item.status).length;
        if (totalItems === 0) { // For checklists with no items like QA1
             const signatures = Object.keys(checklistData.signatures || {});
             return signatures.length > 0 ? 'Completed' : 'Not Started';
        }
        if (completedItems === 0) return 'Not Started';
        if (completedItems >= totalItems) return 'Completed';
        return 'In Progress';
    };

    const confirmAndExecute = (title, message, action) => setModalState({ isOpen: true, title, message, onConfirm: () => { action(); setModalState({ isOpen: false }); } });

    const handleDiscardDraft = () => {
        confirmAndExecute('Discard Draft', 'Are you sure you want to discard this draft? This action cannot be undone.', () => {
            setDraft(null);
            setNotification({ message: 'Draft discarded.', type: 'info' });
        });
    };

    const handleUploadHistory = (missionId) => {
        const mission = history.find(m => m.id === missionId);
        if (!mission) return;

        confirmAndExecute('Confirm Upload', `Are you sure you want to upload the data for mission "${mission.missionHeader.Mission || 'Untitled'}"?`, () => {
            if (!isOnline) {
                setHistory(prev => prev.map(m => m.id === missionId ? { ...m, isPendingUpload: true } : m));
                setNotification({ message: 'You are offline. Mission is queued for sync.', type: 'info' });
                return;
            }
            setIsUploading(missionId);
            setNotification({ message: `Uploading mission...`, type: 'info' });
            setTimeout(() => {
                setHistory(prev => prev.map(m => m.id === missionId ? { ...m, isUploaded: true, isPendingUpload: false } : m));
                setIsUploading(null);
                setNotification({ message: `Mission uploaded successfully!`, type: 'success'});
            }, 2000);
        });
    };
    
    const handleShowAuditTrail = (mission) => {
        setAuditTrailModalState({ isOpen: true, mission: mission });
    };

    const handleExportXLSX = (missionId) => {
        const mission = history.find(m => m.id === missionId);
        if (!mission) return;
        confirmAndExecute('Confirm Export', `Are you sure you want to export the data for mission "${mission.missionHeader.Mission || 'Untitled'}"?`, () => {
            if (typeof window.XLSX === 'undefined') { setNotification({ message: 'Export library is not ready yet. Please try again in a moment.', type: 'error' }); return; }
            setIsExporting(true);
            try {
                const missionToExport = history.find(m => m.id === missionId);
                if (!missionToExport) { setNotification({ message: "Could not find mission data to export.", type: 'error' }); return; }
                const wb = window.XLSX.utils.book_new();
                
                const createSheet = (checklistData, checklistState, prefix = '') => {
                    checklistData.forEach(checklist => {
                        const wsData = [];
                        wsData.push([`Mission: ${missionToExport.missionHeader.Mission || ''}`, `Date: ${missionToExport.missionHeader.Date || ''}`]);
                         wsData.push([`Generated Mission ID: ${missionToExport.generatedId || 'N/A'}`]);
                        if (prefix) wsData.push([`Flight Number: ${prefix.replace('F','')}`]);
                        wsData.push([`Location: ${missionToExport.missionHeader.Location || ''}`, `RPIC: ${missionToExport.missionHeader.RPIC || ''}`]);
                        wsData.push([`Observer / Analyst: ${missionToExport.missionHeader['Observer / Analyst'] || ''}`, `UAV Model: ${missionToExport.missionHeader['UAV Model'] || ''}`]);
                        wsData.push([`Payload: ${missionToExport.missionHeader.Payload || ''}`, `Driver: ${missionToExport.missionHeader.Driver || ''}`]);
                        wsData.push([`License Plate: ${missionToExport.missionHeader['License Plate'] || ''}`]);
                        wsData.push([]); wsData.push([checklist.title]); wsData.push([]);
                        wsData.push(['Section', 'Check Item', 'Description', 'Result', 'Section Remarks']);
                        const currentChecklistState = checklistState[checklist.id] || { items: {}, sections: {} };
                        checklist.sections.forEach(section => {
                            if(section.isSignature) return;
                            const sectionRemarks = (currentChecklistState.sections && currentChecklistState.sections[section.title]?.remarks) || '';
                            wsData.push([section.title, '', '', '', sectionRemarks]);
                            section.items.forEach(item => {
                                const itemState = currentChecklistState.items[item.id] || {};
                                wsData.push(['', item.text, item.description, itemState.status || 'PENDING', '']);
                            });
                        });
                        const ws = window.XLSX.utils.aoa_to_sheet(wsData);
                        const sheetName = `${prefix}${checklist.title}`.replace(/[^a-zA-Z0-9-]/g, '').substring(0, 30);
                        window.XLSX.utils.book_append_sheet(wb, ws, sheetName);
                    });
                };
                createSheet(vehicleChecklistsData, missionToExport.vehicleChecklists);
                missionToExport.flights.forEach((flight, index) => { createSheet(flightChecklistsData, flight.checklists, `F${index + 1}-`); });
                createSheet(maintenanceChecklistsData, missionToExport.maintenanceChecklists);
                window.XLSX.writeFile(wb, `${missionToExport.generatedId || missionToExport.missionHeader?.Mission || 'UAV_Checklist'}.xlsx`);
            } catch (e) { console.error("Export to XLSX failed:", e); setNotification({ message: "An error occurred while generating the Excel file.", type: 'error' });
            } finally { setIsExporting(false); }
        });
    };

    if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;
    
    let currentContent;
    switch(view) {
        case 'home':
            currentContent = <HomePage draft={draft} history={history} onStartNew={handleStartNew} onContinueDraft={handleContinueDraft} onEditHistory={handleEditHistory} onExportHistory={handleExportXLSX} onUploadHistory={handleUploadHistory} onDiscardDraft={handleDiscardDraft} onShowAuditTrail={handleShowAuditTrail} isUploading={isUploading} isExporting={isExporting} sapId={sapId} />;
            break;
        case 'asset_verification':
            currentContent = <AssetVerificationPage sapId={sapId} showNotification={setNotification} />;
            break;
        case 'checklist':
            if (activeMission) {
                const currentChecklist = allChecklistData.find(c => c.id === currentChecklistTab);
                let currentData = {};
                if (vehicleChecklistsData.some(c => c.id === currentChecklistTab)) {
                    currentData = activeMission.vehicleChecklists[currentChecklistTab];
                } else if (maintenanceChecklistsData.some(c => c.id === currentChecklistTab)) {
                    currentData = activeMission.maintenanceChecklists[currentChecklistTab];
                } else if (activeMission.flights[currentFlightIndex]) {
                    currentData = activeMission.flights[currentFlightIndex].checklists[currentChecklistTab];
                }

                currentContent = (
                    <>
                        {currentChecklistTab === 'settings' && <MissionSettings missionHeader={activeMission.missionHeader} onHeaderChange={handleHeaderChange} onStart={handleStartChecklists} errors={missionHeaderErrors} />}
                        {currentChecklistTab === 'dashboard' && <MissionDashboard activeMission={activeMission} getChecklistStatus={getChecklistStatus} setView={handleSetView} />}
                        {currentChecklist && !['settings', 'dashboard'].includes(currentChecklistTab) && <ChecklistContent 
                            checklist={currentChecklist} 
                            data={currentData || {}} 
                            onItemChange={(itemId, newStatus) => handleItemStatusChange(currentChecklistTab, itemId, newStatus)} 
                            onSectionRemarkChange={(sectionTitle, remarks) => handleSectionRemarkChange(currentChecklistTab, sectionTitle, remarks)} 
                            onAttachmentChange={(sectionTitle, file) => handleAttachmentChange(currentChecklistTab, sectionTitle, file)} 
                            onAttachmentDelete={(sectionTitle, index) => handleAttachmentDelete(currentChecklistTab, sectionTitle, index)} 
                            onSectionOkAll={(section) => handleSectionOkAll(currentChecklistTab, section)}
                            headerHeight={headerRef.current?.offsetHeight || 60} 
                            onSaveSignature={(role, dataUrl) => handleSaveSignature(currentChecklistTab, role, dataUrl, currentFlightIndex)}
                            currentFlightIndex={currentFlightIndex}
                            totalFlights={activeMission.flights.length}
                            onFinish={() => handleGoHome(true)}
                            areAllSignaturesComplete={areAllSignaturesComplete()}
                        />}
                    </>
                );
            } else {
                 handleGoHome(false);
                 currentContent = null;
            }
            break;
        default:
            currentContent = <HomePage draft={draft} history={history} onStartNew={handleStartNew} onContinueDraft={handleContinueDraft} onEditHistory={handleEditHistory} onExportHistory={handleExportXLSX} onUploadHistory={handleUploadHistory} onDiscardDraft={handleDiscardDraft} onShowAuditTrail={handleShowAuditTrail} isUploading={isUploading} isExporting={isExporting} sapId={sapId} />;
    }


    return (
        <div className="min-h-screen bg-gray-100 font-sans flex flex-col h-screen">
            <ConfirmationModal isOpen={modalState.isOpen} onClose={() => setModalState({ ...modalState, isOpen: false })} onConfirm={modalState.onConfirm} title={modalState.title}><p>{modalState.message}</p></ConfirmationModal>
            <AuditTrailModal isOpen={auditTrailModalState.isOpen} onClose={() => setAuditTrailModalState({isOpen: false, mission: null})} mission={auditTrailModalState.mission} />
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
                currentView={view === 'checklist' ? currentChecklistTab : view} 
                setView={handleSetView} 
                onGoHome={handleGoHome} 
                isMissionDetailsIncomplete={isMissionDetailsIncomplete} 
                showNotification={setNotification} 
                activeMission={activeMission} 
                currentFlightIndex={currentFlightIndex} 
                setCurrentFlightIndex={setCurrentFlightIndex} 
                onAddFlight={handleAddFlight} 
                onRemoveFlight={handleRemoveFlight}
                getChecklistStatus={getChecklistStatus} 
            />
            <header ref={headerRef} className="bg-white shadow-sm sticky top-0 z-20 flex-shrink-0">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                            <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-full hover:bg-gray-100"><Menu className="w-6 h-6 text-gray-600" /></button>
                            <Plane className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">UAV Ops</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                           <div className={`flex items-center space-x-2 text-sm px-3 py-1 rounded-full ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}><div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div><span>{isOnline ? 'Online' : 'Offline'}</span></div>
                           <div className="flex items-center space-x-2 text-sm text-gray-500"><User className="w-5 h-5" /><span className="hidden sm:inline">{sapId}</span></div>
                           <button onClick={handleLogout} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-500 transition-colors p-2 rounded-md hover:bg-red-50"><LogOut className="w-5 h-5" /><span className="hidden sm:inline">Sign Out</span></button>
                        </div>
                    </div>
                </div>
            </header>
            <main ref={mainContentRef} className="container mx-auto flex-1 overflow-y-auto">
                <Notification notification={notification} onDismiss={() => setNotification({ message: '', type: 'info' })} />
                {currentContent}
            </main>
        </div>
    );
}

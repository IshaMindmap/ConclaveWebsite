import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  FileText,
  Menu,
  X,
  Search,
  User,
  Settings,
  Calendar,
  Filter,
} from 'lucide-react';
import InputBox from '../components/InputBox';
import BlueButton, { DashboardButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import {
  calander,
  centrixwhitelogo,
  deleteicon,
  downloadicon,
  filtericon,
  profile,
  search,
  searchicon,
  settingsicon,
  userIcon,
  viewicon,
} from '../assets';
import {
  Cards,
  GraphCards,
  MostSearchedDashboard,
  UserGrowthDashboard,
} from '../components/Cards';
import { DashboardChatContent } from '../components/Content';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine if we're on mobile
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  const [documents, setDocuments] = useState([
    {
      name: 'Qwerty.jpg',
      date: 'Mar 31, Fri 10:00:00',
      uploadedBy: 'Raj Verma',
      docType: 'Pdf',
      fileFormat: '07:00:00',
    },
    {
      name: 'Qwerty.jpg',
      date: 'Mar 31, Fri 10:00:00',
      uploadedBy: 'Manish Verma',
      docType: 'Pdf',
      fileFormat: '07:00:00',
    },
    {
      name: 'Qwerty.jpg',
      date: 'Mar 31, Fri 10:00:00',
      uploadedBy: 'Anjali Singh',
      docType: 'Pdf',
      fileFormat: '07:00:00',
    },
    {
      name: 'Qwerty.jpg',
      date: 'Mar 31, Fri 10:00:00',
      uploadedBy: 'Raj Verma',
      docType: 'Pdf',
      fileFormat: '07:00:00',
    },
    {
      name: 'Qwerty.jpg',
      date: 'Mar 31, Fri 10:00:00',
      uploadedBy: 'Raj Verma',
      docType: 'Pdf',
      fileFormat: '07:00:00',
    },
    {
      name: 'Qwerty.jpg',
      date: 'Mar 31, Fri 10:00:00',
      uploadedBy: 'Raj Verma',
      docType: 'Pdf',
      fileFormat: '07:00:00',
    },
    {
      name: 'Qwerty.jpg',
      date: 'Mar 31, Fri 10:00:00',
      uploadedBy: 'Raj Verma',
      docType: 'Pdf',
      fileFormat: '07:00:00',
    },
    {
      name: 'Qwerty.jpg',
      date: 'Mar 31, Fri 10:00:00',
      uploadedBy: 'Raj Verma',
      docType: 'Pdf',
      fileFormat: '07:00:00',
    },
  ]);

  // Mobile menu component
  const MobileMenu = () => (
    <div
      className={`fixed inset-0 bg-[#19213D] z-50 transition-transform transform ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <img src={centrixwhitelogo} alt="Logo" className="h-8" />
        <button onClick={() => setMenuOpen(false)}>
          <X className="text-white w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-col p-4 gap-4">
        <button className="text-white text-left py-2 border-b border-gray-700">
          Dashboard
        </button>
        <button className="text-white text-left py-2 border-b border-gray-700">
          Documents
        </button>
        <button className="text-white text-left py-2 border-b border-gray-700">
          Analytics
        </button>
        <button className="text-white text-left py-2 border-b border-gray-700">
          Reports
        </button>
      </div>
    </div>
  );

  // Header component
  const Header = () => (
    <header className="border fill-available bg-[#19213D] border-[#C6C6C6] rounded-lg md:rounded-[1.5rem] border-[0.3px] p-3 md:p-[1.375rem]">
      <div className="flex w-full justify-between items-center mb-4 md:mb-[2rem]">
        <div className="flex items-center">
          {isMobile && (
            <button onClick={() => setMenuOpen(true)} className="mr-2">
              <Menu className="text-white w-6 h-6" />
            </button>
          )}
          <img src={centrixwhitelogo} alt="Logo" className="h-6 md:h-auto" />
        </div>

        {/* Navigation buttons - hidden on mobile */}
        {!isMobile && (
          <div className="hidden md:flex gap-[0.75rem]">
            <DashboardButton text={'Dashboard'} />
            <DashboardButton text={'Documents'} />
            <DashboardButton text={'Analytics'} />
            <DashboardButton text={'Reports'} />
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          {isMobile ? (
            <Search className="text-white w-5 h-5" />
          ) : (
            <img className="w-[40px] h-[40px]" src={search} alt="Search" />
          )}
          {!isMobile && (
            <>
              <img className="w-[40px] h-[40px]" src={profile} alt="Profile" />
              <img
                className="w-[40px] h-[40px]"
                src={settingsicon}
                alt="Settings"
              />
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="font-[700] text-white text-xl md:text-2xl lg:text-[2rem]">
          Good morning, Alex!
        </div>
        <div className="text-white text-sm md:text-base flex items-center gap-2 mt-2 md:mt-0">
          {isMobile ? (
            <Calendar className="w-4 h-4" />
          ) : (
            <img src={calander} className="w-6 text-[1rem]" alt="Calendar" />
          )}
          January 9, 2024
        </div>
      </div>
    </header>
  );

  // Cards section
  const CardSection = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-[0.75rem]">
      <Cards
        head={' Total Users'}
        users={'150'}
        increase={'+200'}
        main={'Recent Activities'}
      />
      <Cards
        head={' Active Users'}
        users={'150'}
        increase={'+200'}
        main={'Recent Activities'}
      />
      <Cards
        head={' Total Documents'}
        users={'150'}
        increase={'+200'}
        main={'Recent Activities'}
      />
      <Cards
        head={' Ai processing time'}
        users={'150'}
        increase={'+200'}
        main={'Recent Activities'}
      />
    </div>
  );

  // Documents table section
  const DocumentsTable = () => (
    <div className="font-mulish font-[600] w-full lg:w-[42rem] h-auto md:h-[19.813rem] bg-white rounded-lg md:rounded-[1.5rem] overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 md:p-4">
        <h1 className="font-mulish font-[600] text-sm md:text-[1rem] mb-2 sm:mb-0">
          List of Newly Uploaded Documents
        </h1>
        <div className="relative w-full sm:w-auto">
          <div className="flex items-center border border-[#B9B9B9] rounded px-2 py-1 md:mr-4">
            {isMobile ? (
              <Filter className="w-4 h-4" />
            ) : (
              <img src={filtericon} className="ml-2" alt="Filter" />
            )}
            <span className="px-2 md:px-3 py-1 text-xs md:text-sm">
              {' '}
              Sort By
            </span>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          </div>
        </div>
      </div>

      <div className="h-auto md:h-[13.5rem] overflow-x-auto overflow-y-auto">
        <table className="w-full font-satoshi border-collapse text-xs md:text-[0.833vw]">
          <thead>
            <tr className="border text-[#073365] text-[0.75rem] font-satoshi font-[500] border-[#B9B9B9]">
              <th className="py-1 md:py-2 px-2 md:px-4 text-left">Doc. Name</th>
              {!isMobile && (
                <th className="py-2 px-4 text-left">Date & Time</th>
              )}
              <th className="py-1 md:py-2 px-2 md:px-4 text-left">
                Uploaded By
              </th>
              {!isMobile && <th className="py-2 px-4 text-left">Doc.Type</th>}
              {!isMobile && (
                <th className="py-2 px-4 text-left">File Format</th>
              )}
              <th className="py-1 md:py-2 px-2 md:px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr
                key={index}
                className="font-satoshi h-[2.2rem] font-[400] text-[#585858] border-b hover:bg-gray-50"
              >
                <td className="px-2 md:px-3 text-[0.75rem] leading-[1rem]">
                  {doc.name}
                </td>
                {!isMobile && (
                  <td className="px-3 text-[0.75rem] leading-[1rem]">
                    {doc.date}
                  </td>
                )}
                <td className="px-2 md:px-3 text-[0.75rem] leading-[1rem]">
                  {doc.uploadedBy}
                </td>
                {!isMobile && (
                  <td className="px-3 text-[0.75rem] leading-[1rem]">
                    {doc.docType}
                  </td>
                )}
                {!isMobile && (
                  <td className="px-3 text-[0.75rem] leading-[1rem]">
                    {doc.fileFormat}
                  </td>
                )}
                <td className="px-2 md:px-3 text-[0.75rem] leading-[1rem]">
                  <div className="flex space-x-1 md:space-x-2 justify-center">
                    {isMobile ? (
                      <>
                        <Eye className="w-4 h-4" />
                        <Download className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <img src={viewicon} alt="View" />
                        <img src={downloadicon} alt="Download" />
                        <img src={deleteicon} alt="Delete" />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-2 sm:px-[1.375rem] py-2 sm:py-[0.5rem]">
        <div className="font-satoshi text-[0.625rem] text-gray-500">
          Showing 1-09 Of 78
        </div>
        <div className="flex items-center">
          <div className="h-1 md:h-2 w-10 md:w-16 bg-blue-500 rounded mx-2"></div>
          <button className="p-1 border rounded mr-1">
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
          </button>
          <button className="p-1 border rounded">
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Recent activities component
  const RecentActivities = () => (
    <div className="font-mulish font-[600] p-3 md:p-[1.375rem] w-full lg:w-[19.125rem] h-auto md:h-[19.813rem] flex flex-col gap-2 md:gap-[0.75rem] bg-white rounded-lg md:rounded-[1.5rem]">
      <p className="font-mulish font-[600] text-sm md:text-[1rem] text-[#313131]">
        Recent Activities
      </p>
      <div className="fill-available-h overflow-y-auto">
        <DashboardChatContent
          img={userIcon}
          userName={'Emma Smith'}
          chatPreview={'Congratulations, Emma ! I just he ...'}
          date={'Jul 29'}
        />
        <DashboardChatContent
          img={userIcon}
          userName={'Emma Smith'}
          chatPreview={'Congratulations, Emma ! I just he ...'}
          date={'Jul 29'}
        />
        <DashboardChatContent
          img={userIcon}
          userName={'Emma Smith'}
          chatPreview={'Congratulations, Emma ! I just he ...'}
          date={'Jul 29'}
        />
        <DashboardChatContent
          img={userIcon}
          userName={'Emma Smith'}
          chatPreview={'Congratulations, Emma ! I just he ...'}
          date={'Jul 29'}
        />
        <DashboardChatContent
          img={userIcon}
          userName={'Emma Smith'}
          chatPreview={'Congratulations, Emma ! I just he ...'}
          date={'Jul 29'}
        />
        <DashboardChatContent
          img={userIcon}
          userName={'Emma Smith'}
          chatPreview={'Congratulations, Emma ! I just he ...'}
          date={'Jul 29'}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col gap-3 md:gap-[1rem] bg-[#111478] p-3 md:p-[1.25rem] font-mulish overflow-x-hidden">
      {/* Mobile menu */}
      {isMobile && <MobileMenu />}

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="w-full flex flex-col lg:flex-row gap-3 md:gap-[0.75rem]">
        {/* Left section */}
        <section className="flex flex-col gap-3 md:gap-[1rem] w-full lg:w-2/3">
          {/* Cards row */}
          <CardSection />

          {/* Documents and activities row */}
          <div className="flex flex-col lg:flex-row gap-3 md:gap-[0.75rem]">
            <DocumentsTable />

            {/* Only show on larger screens or as separate section on mobile */}
            {isDesktop ? <RecentActivities /> : null}
          </div>
        </section>

        {/* Right section */}
        <section className="flex flex-col w-full lg:w-1/3 gap-3 md:gap-[0.75rem]">
          {/* Show activities on tablets before charts */}
          {isTablet && <RecentActivities />}

          {/* Always show on mobile */}
          {isMobile && <RecentActivities />}

          <UserGrowthDashboard />
          <MostSearchedDashboard />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  FileText,
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
import { Cards, GraphCards, MostSearchedDashboard, UserGrowthDashboard } from '../components/Cards';
import { DashboardChatContent } from '../components/Content';

export const Dashboard = () => {
  const navigate = useNavigate();
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
  return (
    <div className="lg:h-fit md:h-screen w-screen flex flex-col gap-[1rem] justify-between h-min-[778px] bg-[#111478] p-[1.25rem] font-mulish">
      <header className="border fill-available bg-[#19213D] border-[#C6C6C6] rounded-[1.5rem] border-[0.3px] p-[1.375rem] ">
        <div className="flex w-full justify-between mb-[2rem]">
          <img src={centrixwhitelogo} />
          <div className="flex gap-[0.75rem]">
            <DashboardButton text={'Dashboard'} />
            <DashboardButton text={'Documents'} />
            <DashboardButton text={'Analytics'} />
            <DashboardButton text={'Reports'} />
          </div>
          <div className="flex gap-2">
            <img className="w-[40px] h-[40px]" src={search} />
            <img className="w-[40px] h-[40px]" src={profile} />
            <img className="w-[40px] h-[40px]" src={settingsicon} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="font-[700] text-white text-[2rem]">
            Good morning, Alex!
          </div>
          <div className="text-white flex justify-center items-center gap-2">
            <img src={calander} className="w-6 text-[1rem]" /> January 9, 2024
          </div>
        </div>
      </header>
      <main className="w-full flex flex gap-[0.75rem]">
        <section className="flex flex-col gap-[1rem]">
          <div className="flex gap-[0.75rem]">
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
          <div className="flex gap-[0.75rem]">
            <div className="font-mulish font-[600] w-[42rem] h-[19.813rem] bg-white rounded-[1.5rem]">
              <div className="flex justify-between items-center">
                <h1 className="font- mulish p-4  font-[600] text-[1rem]">
                  List of Newly Uploaded Documents
                </h1>
                <div className="relative">
                  <div className="flex items-center border border-[#B9B9B9] rounded mr-4">
                    <img src={filtericon} className="ml-2" />
                    <span className="px-3 py-1 text-sm"> Sort By</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className=" h-[13.5rem] overflow-y-auto">
                <table className="w-full  font-satoshi border-collapse text-[0.833vw]">
                  <thead>
                    <tr className="border text-[#073365] text-[0.75rem] font-satoshi font-[500] border-[#B9B9B9]">
                      <th className="py-2 px-4 text-left">Doc. Name</th>
                      <th className="py-2 px-4 text-left">Date & Time</th>
                      <th className="py-2 px-4 text-left">Uploaded By</th>
                      <th className="py-2 px-4 text-left">Doc.Type</th>
                      <th className="py-2 px-4 text-left">File Format</th>
                      <th className="py-2 px-4 text-center">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc, index) => (
                      <tr
                        key={index}
                        className="font-satoshi h-[2.2rem] font-[400] text-[#585858] border-b hover:bg-gray-50"
                      >
                        <td className="px-3 text-[0.75rem] leading-[1rem] ">
                          {doc.name}
                        </td>
                        <td className="px-3 text-[0.75rem] leading-[1rem]">
                          {doc.date}
                        </td>
                        <td className="px-3 text-[0.75rem] leading-[1rem]">
                          {doc.uploadedBy}
                        </td>
                        <td className="px-3 text-[0.75rem] leading-[1rem]">
                          {doc.docType}
                        </td>
                        <td className="px-3 text-[0.75rem] leading-[1rem]">
                          {doc.fileFormat}
                        </td>
                        <td className="px-3 text-[0.75rem] leading-[1rem]">
                          <div className="flex space-x-2">
                            <img src={viewicon} />
                            <img src={downloadicon} />
                            <img src={deleteicon} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between px-[1.375rem] py-[0.5rem]">
                <div className="font-satoshi text-[0.625rem] text-gray-500">
                  Showing 1-09 Of 78
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-16 bg-blue-500 rounded mx-2"></div>
                  <button className="p-1 border rounded mr-1">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1 border rounded">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="font-mulish font-[600] p-[1.375rem] w-[19.125rem] h-[19.813rem] flex flex-col gap-[0.75rem] bg-white rounded-[1.5rem]">
              <p className="font-mulish font-[600] text-[1rem] text-[#313131]">
                Recent Activities
              </p>
              <div className="fill-available-h overflow-x-auto">
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
          </div>
        </section>

        <section className="flex flex-col w-full fill-available-h gap-[0.75rem]">
          <UserGrowthDashboard />

          <MostSearchedDashboard />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

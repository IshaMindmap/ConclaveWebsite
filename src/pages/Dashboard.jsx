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
  profile,
  search,
  searchicon,
  settingsicon,
} from '../assets';
import Cards from '../components/Cards';

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
      uploadedBy: 'Manish Verma',
      docType: 'Pdf',
      fileFormat: '07:00:00',
    },
  ]);
  return (
    <div className="bg-[#111478] p-4 font-mulish">
      <div className="border border-[#C6C6C6] rounded-[1.667vw] border-[0.3px] p-4 ">
        <div className="flex justify-between mb-20">
          <img src={centrixwhitelogo} />
          <div className="flex gap-2">
            <DashboardButton text={'Dashboard'} />
            <DashboardButton text={'Documents'} />
            <DashboardButton text={'Analytics'} />
            <DashboardButton text={'Reports'} />
          </div>
          <div className="flex gap-2">
            <img src={search} />
            <img src={profile} />
            <img src={settingsicon} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="font-[700] text-white text-[2vw]">
            Good morning, Alex!
          </div>
          <div className="text-white flex justify-center items-center gap-2">
            <img src={calander} className="w-6" /> January 9, 2024
          </div>
        </div>
      </div>
      <div className="my-4 flex gap-4">
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
      <div className="font-mulish font-[600] text-[1.111vw] w-[46.597vw] bg-white rounded-[1.667vw] p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">
            List of Newly Uploaded Documents
          </h1>
          <div className="relative">
            <div className="flex items-center border rounded">
              <span className="px-3 py-1 text-sm">Short By</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left font-medium text-gray-600">
                  Doc. Name
                </th>
                <th className="py-2 px-4 text-left font-medium text-gray-600">
                  Date & Time
                </th>
                <th className="py-2 px-4 text-left font-medium text-gray-600">
                  Uploaded By
                </th>
                <th className="py-2 px-4 text-left font-medium text-gray-600">
                  Doc.Type
                </th>
                <th className="py-2 px-4 text-left font-medium text-gray-600">
                  File Format
                </th>
                <th className="py-2 px-4 text-left font-medium text-gray-600">
                  Download
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{doc.name}</td>
                  <td className="py-3 px-4 text-sm">{doc.date}</td>
                  <td className="py-3 px-4 text-sm">{doc.uploadedBy}</td>
                  <td className="py-3 px-4 text-sm">{doc.docType}</td>
                  <td className="py-3 px-4 text-sm">{doc.fileFormat}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 bg-blue-500 text-white rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 bg-green-500 text-white rounded">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 bg-orange-500 text-white rounded">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">Showing 1-09 Of 78</div>
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
    </div>
  );
};

export default Dashboard;

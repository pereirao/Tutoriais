using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Description;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using WCFClasslibrary;

namespace WCFWindowsForms
{
    public partial class Form1 : Form
    {
        ServiceHost host;
        public Form1()
        {
            InitializeComponent();
        }

        private void btnStartServer_Click(object sender, EventArgs e)
        {
            if (host == null || host.State != CommunicationState.Opened)
            {
                btnStartServer.Enabled = false;

                Uri baseAddress = new Uri("http://localhost:41234/service/");
                host = new ServiceHost(typeof(User), baseAddress);

                //host.AddServiceEndpoint(typeof(IUser), new NetTcpBinding(), "net.tcp://localhost:1234/userservice");
                //host.AddServiceEndpoint(typeof(IUser), new BasicHttpBinding(), "http://localhost:41234/service/userservice/");

                ServiceMetadataBehavior smb = new ServiceMetadataBehavior();
                smb.HttpGetEnabled = true;
                smb.MetadataExporter.PolicyVersion = PolicyVersion.Policy15;

                host.Description.Behaviors.Add(smb);

                host.Open();
                btnStartServer.Text = "Terminate Server";
                btnStartServer.Enabled = true;
            }
            else
            {
                btnStartServer.Enabled = false;
                host.Close();
                btnStartServer.Text = "Start Server";
                btnStartServer.Enabled = true;
            }
        }
    }
}

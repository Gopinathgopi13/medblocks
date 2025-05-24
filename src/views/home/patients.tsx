import { useEffect, useRef, useState } from "react";
import { initDb } from "../../db";
import CreatePatient from "../../components/Forms/CreatePatient";
import Modal from "../../components/modal";
import Navbar from "../../components/Navbar";
import Table from "../../components/table";
import { columns } from "./columns";
import Loader from "../../components/loader";
import { broadcastChange, onDbChange } from "../../db/sync";
import { toast } from "react-toastify";

interface FormRefProps {
  submitForm: () => void;
}
let db: any;

export default function Patients() {
  const locationRef = useRef<FormRefProps>(null);
  const isMount = useRef(true);
  const [isLoading, setisLoading] = useState(true);
  const [patients, setPatients] = useState<any[] | null>([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

  const fetchPatients = async () => {
    try {
      db = await initDb();
      const result = await db.query("SELECT * FROM patients");
      setPatients(result.rows);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      if (isMount.current) {
        setisLoading(false);
      }
    }
  };

  useEffect(() => {
    isMount.current = true;

    const setup = async () => {
      db = await initDb();
      await fetchPatients();

      onDbChange(async () => {
        await fetchPatients();
      });
    };

    setup();

    return () => {
      isMount.current = false;
    };
  }, []);

  const closeModal = () => {
    setisModalOpen(false);
  };

  const onEdit = (patientData: number) => {
    setSelectedPatient(patientData);
    setisModalOpen(true);
  };

  const onDelete = async (patientData: any) => {
    try {
      db = await initDb();
      await db.query("DELETE FROM patients WHERE id = $1", [patientData?.id]);
      toast.success("Patient details deleted successfully");
      fetchPatients();
    } catch (error) {
      toast.error("Failed to delete");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="p-4">
        <Table
          data={patients ?? []}
          columns={columns(onEdit, onDelete)}
          headerActions={{
            title: "Patients List",
            isAnimatedLabel: true,
            subtitle: "Total Patients : " + (patients?.length ?? 0),
            actions: [
              { id: 1, icon: "Add", label: "Create Patient" },
              { id: 2, icon: "Refresh", isDisabled: false },
            ],
            onActionPress: (action) => {
              if (action.id === 1) {
                if (isMount.current) {
                  setisModalOpen(true);
                }
              } else if (action.id === 2) {
                if (isMount.current) {
                  setisLoading(true);
                }
                fetchPatients();
              }
            },
          }}
        />
      </main>
      <Modal
        size="2xl"
        open={isModalOpen}
        onCancel={closeModal}
        title={`${selectedPatient ? "Update Patient" : "Create Patient"}`}
        positiveBtnText={selectedPatient ? "Update" : "Create"}
        scrollBehavior="body"
        onSubmit={() => locationRef.current?.submitForm()}
      >
        <CreatePatient
          db={db}
          data={selectedPatient}
          ref={locationRef}
          onClose={() => {
            setisModalOpen(false);
            setSelectedPatient(null);
            broadcastChange();
            fetchPatients();
          }}
        />
      </Modal>
      <Loader isVisible={isLoading} />
    </>
  );
}

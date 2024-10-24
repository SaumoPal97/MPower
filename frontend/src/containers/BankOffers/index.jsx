import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import BotChat from "@/components/BotChat";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/lib/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BankOffers() {
  const [isAddScreen, setIsAddScreen] = useState(false);

  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  const [bankOffers, setBankOffers] = useState([]);

  useEffect(() => {
    const getBankOffers = async () => {
      const response = await fetch(`${API_URL}/v1/api/bank_offers/`);
      const res = await response.json();
      setBankOffers(res);
    };
    getBankOffers();
  }, [isAddScreen]);

  const [bankName, setBankName] = useState("");
  const [bankImageLink, setBankImageLink] = useState("");
  const [offerDetails, setOfferDetails] = useState("");
  const [offerLink, setOfferLink] = useState("");
  const [offerDetailsLink, setOfferDetailsLink] = useState("");

  const submitBankOfferForm = async () => {
    try {
      await fetch(`${API_URL}/v1/api/bank_offers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bank_name: bankName,
          bank_image: bankImageLink,
          offer_details: offerDetails,
          offer_url: offerLink,
          offer_details_url: offerDetailsLink,
        }),
      });
      toast.success("Bank Offer Added!");
    } catch {
      toast.error("Creating new bank offer failed :(");
    }
    setIsAddScreen(false);
  };

  useEffect(() => {
    setHeight(
      window.innerHeight - ref.current.getBoundingClientRect().top - 60
    );
  }, [setHeight]);

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-6 gap-3 h-full pb-24">
        {isAddScreen ? (
          <div className="flex flex-col col-span-4">
            <Button onClick={() => setIsAddScreen(false)} className="w-20">
              Back
            </Button>
            <div className="w-full text-center font-bold text-2xl my-4">
              Add New Bank Offer
            </div>
            <div className="mx-auto w-5/6">
              <div className="flex flex-col items-center">
                <Input
                  type="text"
                  placeholder="Bank Name"
                  value={bankName}
                  className="mb-2"
                  onChange={(e) => setBankName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Bank Image Link"
                  value={bankImageLink}
                  className="mb-2"
                  onChange={(e) => setBankImageLink(e.target.value)}
                />
                <Textarea
                  type="text"
                  placeholder="Offer Details"
                  value={offerDetails}
                  className="mb-2"
                  onChange={(e) => setOfferDetails(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Offer Link"
                  value={offerLink}
                  className="mb-2"
                  onChange={(e) => setOfferLink(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Offer Details PDF Link"
                  value={offerDetailsLink}
                  className="mb-2"
                  onChange={(e) => setOfferDetailsLink(e.target.value)}
                />
                <Button type="submit" onClick={submitBankOfferForm}>
                  Add New Offer
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col col-span-4">
            <div className="flex flex-row items-end justify-between mb-5">
              <p className="font-bold text-2xl">Bank Offers</p>
              <Button onClick={() => setIsAddScreen(true)}>+ Add New</Button>
            </div>
            <div className="grid grid-cols-3 grid-flow-rows gap-4">
              {bankOffers.map((offer) => {
                return (
                  <Card key={offer.boid}>
                    <CardContent className="w-full h-48">
                      <p className="font-semibold text-md pt-4">
                        {offer.bank_name}
                      </p>
                      <img
                        src={offer.bank_image}
                        className="h-full w-full mt-2"
                      />
                    </CardContent>
                    <CardFooter className="flex flex-row justify-between mt-10">
                      <p className="font-bold text-md">{offer.offer_details}</p>
                      <a href={offer.offer_url} target="_blank">
                        <Button className="mt-2">See More</Button>
                      </a>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex flex-col col-span-2">
          <p
            ref={ref}
            className="font-bold text-2xl text-center leading-none mb-5"
          >
            Ask MPower Chat
          </p>
          <BotChat
            style={{ height }}
            chatEndpoint="/v1/api/bank_offers/chat/"
          />
        </div>
      </div>
    </>
  );
}

export default BankOffers;

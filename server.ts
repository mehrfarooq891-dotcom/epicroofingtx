import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Lazy-initialize Gemini SDK to prevent crashes if key is initially empty
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI inspection will return simulated responses.");
    }
    geminiClient = new GoogleGenAI({
      apiKey: key || "DUMMY_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json({ limit: '10mb' }));

  // API Route: AI Roof Damage and Certified HAAG Assessment Proxy
  app.post("/api/analyze-roof", async (req, res) => {
    try {
      const { city = "Houston", damageType = "Storm Damage", details = "", material = "Asphalt Shingles", estimatedSqFt = 2500 } = req.body;
      
      const prompt = `
        You are a senior roof assessor and certified HAAG forensic storm damage inspector for Epic Roofing TX in the ${city}, TX area.
        Produce an authoritative, highly persuasive storm damage evaluation report for a homeowner.
        
        The details of the damage are:
        - City/Location: ${city}, TX
        - Damage Category: ${damageType}
        - Current Roof Material: ${material}
        - Estimated Roof Size: ${estimatedSqFt} Sq Ft
        - Additional Details/Symptoms: "${details || "Not specified by homeowner."}"
        
        Generate a highly professional, structured JSON report following this exact structure:
        {
          "reportTitle": "Forensic Roof Damage & Wind/Hail Evaluation Report",
          "cityLocation": "${city}, TX",
          "haagStatus": "HIGH SUSPICION OF STABILIZING HAAG-CERTIFIED RESTORATION",
          "leakRisk": "Severity Level (Low, Medium, High, or critical)",
          "forensicAssessment": "A 3-4 sentence detailed scientific explanation on how the storm (hail impacts, microburst wind uplift, or severe leak) compromises the thermal barrier, asphalt granules, or metal seams of a roof in the local ${city} climate. Mention high Texas humidity and local storm occurrences.",
          "recommendedActions": [
            "At least 4 highly actionable steps (e.g. 'Schedule immediate thermal leak detection', 'Emergency physical tarping over compromised joints', etc.) with concise reasons why."
          ],
          "insuranceStrategy": "Provide a 2-sentence expert advice on how to handle GAF shingle warranty or local Texas homeowner insurance claims for this specific damage.",
          "estimateRange": {
            "low": "Calculated low repair cost based on standard Texas rates ($X,XXX)",
            "high": "Calculated high repair cost ($X,XXX)",
            "unitCostExplanation": "Short 1-sentence breakdown of prices (e.g., $XXX per square)"
          }
        }
        
        Output DO NOT wrap in markdown ticks or prefix with any explanation. Return ONLY the raw valid JSON matching this schema exactly.
      `;

      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        // Fallback mockup in case API key is missing
        return res.json({
          reportTitle: "Forensic Roof Damage & Wind/Hail Evaluation Report",
          cityLocation: `${city}, TX`,
          haagStatus: "POSSIBLE STABILIZING HAAG-CERTIFIED RESTORATION REQUIRED",
          leakRisk: "Medium-High",
          forensicAssessment: `The specified storm damage at ${city}, TX requires immediate stabilization. Exposure to high-velocity Gulf wind shear or thermal shock can compromise your roof's shingle granules, underlayment adhesion, and sealing integrity. Under typical Texas humidity and sudden downpours, neglected micro-fractures lead to rot, structural deck compromises, and severe under-deck mold.`,
          recommendedActions: [
            "Deploy emergency heavy-duty tarping over compromised decking joints to prevent internal mold.",
            "Schedule a professional high-definition physical inspection with HAAG-certified forensic moisture tools.",
            "Document granule loss and shingle lift patterns immediately using 4K digital close-ups.",
            "Isolate electrical pathways near wet attic zones to prevent dangerous circuit shorts."
          ],
          "insuranceStrategy": "Texas windstorm and commercial insurance policies require immediate rapid mitigation steps within 180 days. Use our forensic report as evidence.",
          estimateRange: {
            low: `$${(estimatedSqFt * 4.2).toFixed(0)}`,
            high: `$${(estimatedSqFt * 6.5).toFixed(0)}`,
            unitCostExplanation: `Estimated local rate at approx $320 - $550 per roofing square depending on architectural shingles vs premium metal.`
          }
        });
      }

      const client = getGeminiClient();
      const response = await client.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text || "";
      let parsedData;
      try {
        parsedData = JSON.parse(responseText.trim());
      } catch (e) {
        // Fallback parse if JSON was wrapped or slightly imperfect
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0].trim());
        } else {
          throw new Error("Could not parse JSON response from Gemini API");
        }
      }

      return res.json(parsedData);
    } catch (error: any) {
      console.error("Gemini assessment error:", error);
      return res.status(500).json({ error: error.message || "An error occurred during assessment" });
    }
  });

  // Serve shared static assets/files
  const componentsPath = path.join(process.cwd(), 'components.html');
  app.get('/components.html', (req, res) => {
    res.sendFile(componentsPath);
  });

  // Serve Houston Roof Repair landing page
  const roofRepairPath = path.join(process.cwd(), 'roof-repair-houston.html');
  app.get('/roof-repair-houston', (req, res) => {
    res.sendFile(roofRepairPath);
  });
  app.get('/roof-repair-houston.html', (req, res) => {
    res.sendFile(roofRepairPath);
  });

  // Serve Houston Roof Replacement landing page
  const roofReplacementPath = path.join(process.cwd(), 'roof-replacement-houston.html');
  app.get('/roof-replacement-houston', (req, res) => {
    res.sendFile(roofReplacementPath);
  });
  app.get('/roof-replacement-houston.html', (req, res) => {
    res.sendFile(roofReplacementPath);
  });

  // Serve Houston Storm Damage & Hail Damage landing page
  const stormDamagePath = path.join(process.cwd(), 'storm-damage-roofing-houston.html');
  app.get('/storm-damage-roofing-houston', (req, res) => {
    res.sendFile(stormDamagePath);
  });
  app.get('/storm-damage-roofing-houston.html', (req, res) => {
    res.sendFile(stormDamagePath);
  });

  // Serve Houston Insurance Claim Roofing landing page
  const insuranceClaimPath = path.join(process.cwd(), 'insurance-claim-roofing-houston.html');
  app.get('/insurance-claim-roofing-houston', (req, res) => {
    res.sendFile(insuranceClaimPath);
  });
  app.get('/insurance-claim-roofing-houston.html', (req, res) => {
    res.sendFile(insuranceClaimPath);
  });

  // Serve Houston Commercial Roofing landing page
  const commercialPath = path.join(process.cwd(), 'commercial-roofing-houston.html');
  app.get('/commercial-roofing-houston', (req, res) => {
    res.sendFile(commercialPath);
  });
  app.get('/commercial-roofing-houston.html', (req, res) => {
    res.sendFile(commercialPath);
  });

  // Serve Houston Free Roof Inspection landing page
  const freeInspectionPath = path.join(process.cwd(), 'free-roof-inspection-houston.html');
  app.get('/free-roof-inspection-houston', (req, res) => {
    res.sendFile(freeInspectionPath);
  });
  app.get('/free-roof-inspection-houston.html', (req, res) => {
    res.sendFile(freeInspectionPath);
  });

  // Serve Houston Hail Damage Roof Repair landing page
  const hailDamagePath = path.join(process.cwd(), 'hail-damage-roof-repair-houston.html');
  app.get('/hail-damage-roof-repair-houston', (req, res) => {
    res.sendFile(hailDamagePath);
  });
  app.get('/hail-damage-roof-repair-houston.html', (req, res) => {
    res.sendFile(hailDamagePath);
  });

  // Serve Houston Wind Damage Roof Repair landing page
  const windDamagePath = path.join(process.cwd(), 'wind-damage-roof-repair-houston.html');
  app.get('/wind-damage-roof-repair-houston', (req, res) => {
    res.sendFile(windDamagePath);
  });
  app.get('/wind-damage-roof-repair-houston.html', (req, res) => {
    res.sendFile(windDamagePath);
  });

  // Serve Houston Emergency Roof Tarping landing page
  const emergencyTarpingPath = path.join(process.cwd(), 'emergency-roof-tarping-houston.html');
  app.get('/emergency-roof-tarping-houston', (req, res) => {
    res.sendFile(emergencyTarpingPath);
  });
  app.get('/emergency-roof-tarping-houston.html', (req, res) => {
    res.sendFile(emergencyTarpingPath);
  });

  // Serve Houston Metal Roofing landing page
  const metalRoofingPath = path.join(process.cwd(), 'metal-roofing-houston.html');
  app.get('/metal-roofing-houston', (req, res) => {
    res.sendFile(metalRoofingPath);
  });
  app.get('/metal-roofing-houston.html', (req, res) => {
    res.sendFile(metalRoofingPath);
  });

  // Serve Houston Tile Roofing landing page
  const tileRoofingPath = path.join(process.cwd(), 'tile-roofing-houston.html');
  app.get('/tile-roofing-houston', (req, res) => {
    res.sendFile(tileRoofingPath);
  });
  app.get('/tile-roofing-houston.html', (req, res) => {
    res.sendFile(tileRoofingPath);
  });

  // Serve Houston Roof Coating landing page
  const roofCoatingPath = path.join(process.cwd(), 'roof-coating-houston.html');
  app.get('/roof-coating-houston', (req, res) => {
    res.sendFile(roofCoatingPath);
  });
  app.get('/roof-coating-houston.html', (req, res) => {
    res.sendFile(roofCoatingPath);
  });

  // Serve Katy TX Roofing Contractor landing page
  const katyPath = path.join(process.cwd(), 'katy-roofing-contractor.html');
  app.get('/katy-roofing-contractor', (req, res) => {
    res.sendFile(katyPath);
  });
  app.get('/katy-roofing-contractor.html', (req, res) => {
    res.sendFile(katyPath);
  });

  // Serve Sugar Land TX Roofing Contractor landing page
  const sugarLandPath = path.join(process.cwd(), 'sugar-land-roofing-contractor.html');
  app.get('/sugar-land-roofing-contractor', (req, res) => {
    res.sendFile(sugarLandPath);
  });
  app.get('/sugar-land-roofing-contractor.html', (req, res) => {
    res.sendFile(sugarLandPath);
  });

  // Serve Cypress TX Roofing Contractor landing page
  const cypressPath = path.join(process.cwd(), 'cypress-roofing-contractor.html');
  app.get('/cypress-roofing-contractor', (req, res) => {
    res.sendFile(cypressPath);
  });
  app.get('/cypress-roofing-contractor.html', (req, res) => {
    res.sendFile(cypressPath);
  });

  // Serve Pearland TX Roofing Contractor landing page
  const pearlandPath = path.join(process.cwd(), 'pearland-roofing-contractor.html');
  app.get('/pearland-roofing-contractor', (req, res) => {
    res.sendFile(pearlandPath);
  });
  app.get('/pearland-roofing-contractor.html', (req, res) => {
    res.sendFile(pearlandPath);
  });

  // Serve Spring TX Roofing Contractor landing page
  const springPath = path.join(process.cwd(), 'spring-tx-roofing-contractor.html');
  app.get('/spring-tx-roofing-contractor', (req, res) => {
    res.sendFile(springPath);
  });
  app.get('/spring-tx-roofing-contractor.html', (req, res) => {
    res.sendFile(springPath);
  });

  // Serve The Woodlands TX Roofing Contractor landing page
  const woodlandsPath = path.join(process.cwd(), 'the-woodlands-roofing-contractor.html');
  app.get('/the-woodlands-roofing-contractor', (req, res) => {
    res.sendFile(woodlandsPath);
  });
  app.get('/the-woodlands-roofing-contractor.html', (req, res) => {
    res.sendFile(woodlandsPath);
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
    console.log(`Shared components available at http://0.0.0.0:${PORT}/components.html`);
  });
}

startServer();

import React, { useState } from 'react';
import { submitPrediction } from '../services/api';
import { ShieldAlert, CheckCircle, Smartphone } from 'lucide-react';

export default function AshaWorkerForm() {
  const [formData, setFormData] = useState({
    village_name: '', district: '', population: 0,
    water_source: 'Well', ph_level: 7.0, turbidity: 0.0, chlorine_level: 0.0,
    open_defecation_status: 'No', waste_disposal_method: 'Bin',
    temperature: 30.0, rainfall_mm: 0.0,
    fever_cases: 0, diarrhea_cases: 0, vomiting_cases: 0, stomach_pain_cases: 0
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await submitPrediction(formData);
      setPrediction(result);
    } catch (err) {
      setError(err.message || 'An error occurred during prediction.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2 border border-slate-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <div className="mx-auto w-full bg-white p-8 rounded-xl shadow-lg border border-slate-100" style={{ maxWidth: '800px' }}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Disease Early Warning Protocol</h2>
        <p className="text-slate-500 mt-1">ASHA Worker Data Entry Module</p>
      </div>

      {!prediction ? (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700 pb-2 border-b">1. Demographics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="village_name" placeholder="Village Name" onChange={handleChange} required className={inputClass} />
              <input name="district" placeholder="District" onChange={handleChange} required className={inputClass} />
              <input name="population" type="number" placeholder="Population" onChange={handleChange} className={inputClass} />
            </div>

            <h3 className="font-semibold text-slate-700 pb-2 border-b mt-6">2. Environmental & Water</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="water_source" onChange={handleChange} className={inputClass}>
                <option value="Well">Well</option>
                <option value="Tap">Tap</option>
                <option value="River">River</option>
                <option value="Handpump">Handpump</option>
              </select>
              <input name="ph_level" type="number" step="0.1" placeholder="pH Level" onChange={handleChange} className={inputClass} />
              <input name="turbidity" type="number" step="0.1" placeholder="Turbidity (NTU)" onChange={handleChange} className={inputClass} />
              <input name="chlorine_level" type="number" step="0.1" placeholder="Chlorine (mg/L)" onChange={handleChange} className={inputClass} />
              <select name="open_defecation_status" onChange={handleChange} className={inputClass}>
                <option value="No">No Open Defecation</option>
                <option value="Yes">Open Defecation Priority</option>
              </select>
            </div>

            <h3 className="font-semibold text-slate-700 pb-2 border-b mt-6">3. Clinical Symptoms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="fever_cases" type="number" placeholder="Fever Cases" onChange={handleChange} className={inputClass} />
              <input name="diarrhea_cases" type="number" placeholder="Diarrhea Cases" onChange={handleChange} className={inputClass} />
              <input name="vomiting_cases" type="number" placeholder="Vomiting Cases" onChange={handleChange} className={inputClass} />
              <input name="stomach_pain_cases" type="number" placeholder="Stomach Pain" onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-4 rounded-lg font-medium transition-colors">
            {loading ? 'Analyzing...' : 'Generate AI Risk Prediction'}
          </button>
          
          {error && (
            <div className="mt-4 p-4 bg-orange-50 text-orange-700 rounded-lg flex items-center gap-2">
              <Smartphone className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </form>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-2">
          <div className={`p-6 rounded-lg border-l-4 ${
            prediction.risk_level === 'Critical' ? 'bg-red-50 border-red-500' : 
            prediction.risk_level === 'High' ? 'bg-orange-50 border-orange-500' :
            prediction.risk_level === 'Medium' ? 'bg-yellow-50 border-yellow-500' : 'bg-green-50 border-green-500'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              {['High', 'Critical'].includes(prediction.risk_level) ? <ShieldAlert className="w-8 h-8 text-red-500"/> : <CheckCircle className="w-8 h-8 text-green-500"/>}
              <h3 className="text-xl font-bold">Risk Level: {prediction.risk_level}</h3>
            </div>
            <p className="text-lg font-medium mt-4">Predicted Outbreak: {prediction.disease}</p>
            <p className="text-slate-600 mt-1">Expected symptomatic cases: ~{prediction.symptom_count}</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-lg">
            <h4 className="font-bold text-slate-800 mb-3">Recommended Actions</h4>
            <ul className="space-y-2">
              {prediction.recommended_actions.map((action, i) => (
                <li key={i} className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <button onClick={() => setPrediction(null)} className="w-full border-2 border-slate-200 text-slate-700 hover:bg-slate-50 py-3 rounded-lg font-medium transition-colors">
            Start New Assessment
          </button>
        </div>
      )}
    </div>
  );
}
